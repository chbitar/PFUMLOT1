package com.planeta.pfum.web.rest;

import com.planeta.pfum.Pfumv10App;
import com.planeta.pfum.domain.NoteMaster;
import com.planeta.pfum.repository.NoteMasterRepository;
import com.planeta.pfum.repository.search.NoteMasterSearchRepository;
import com.planeta.pfum.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Collections;
import java.util.List;

import static com.planeta.pfum.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.planeta.pfum.domain.enumeration.Semestre;
/**
 * Integration tests for the {@Link NoteMasterResource} REST controller.
 */
@SpringBootTest(classes = Pfumv10App.class)
public class NoteMasterResourceIT {

    private static final Semestre DEFAULT_SEMESTRE = Semestre.S1;
    private static final Semestre UPDATED_SEMESTRE = Semestre.S2;

    private static final Double DEFAULT_NOTE_CC_1 = 1D;
    private static final Double UPDATED_NOTE_CC_1 = 2D;

    private static final Double DEFAULT_NOTE_CC_2 = 1D;
    private static final Double UPDATED_NOTE_CC_2 = 2D;

    private static final Double DEFAULT_NOTE_FINAL = 1D;
    private static final Double UPDATED_NOTE_FINAL = 2D;

    private static final Instant DEFAULT_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private NoteMasterRepository noteMasterRepository;

    /**
     * This repository is mocked in the com.planeta.pfum.repository.search test package.
     *
     * @see com.planeta.pfum.repository.search.NoteMasterSearchRepositoryMockConfiguration
     */
    @Autowired
    private NoteMasterSearchRepository mockNoteMasterSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restNoteMasterMockMvc;

    private NoteMaster noteMaster;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final NoteMasterResource noteMasterResource = new NoteMasterResource(noteMasterRepository, mockNoteMasterSearchRepository);
        this.restNoteMasterMockMvc = MockMvcBuilders.standaloneSetup(noteMasterResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static NoteMaster createEntity(EntityManager em) {
        NoteMaster noteMaster = new NoteMaster()
            .semestre(DEFAULT_SEMESTRE)
            .noteCC1(DEFAULT_NOTE_CC_1)
            .noteCC2(DEFAULT_NOTE_CC_2)
            .noteFinal(DEFAULT_NOTE_FINAL)
            .date(DEFAULT_DATE);
        return noteMaster;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static NoteMaster createUpdatedEntity(EntityManager em) {
        NoteMaster noteMaster = new NoteMaster()
            .semestre(UPDATED_SEMESTRE)
            .noteCC1(UPDATED_NOTE_CC_1)
            .noteCC2(UPDATED_NOTE_CC_2)
            .noteFinal(UPDATED_NOTE_FINAL)
            .date(UPDATED_DATE);
        return noteMaster;
    }

    @BeforeEach
    public void initTest() {
        noteMaster = createEntity(em);
    }

    @Test
    @Transactional
    public void createNoteMaster() throws Exception {
        int databaseSizeBeforeCreate = noteMasterRepository.findAll().size();

        // Create the NoteMaster
        restNoteMasterMockMvc.perform(post("/api/note-masters")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(noteMaster)))
            .andExpect(status().isCreated());

        // Validate the NoteMaster in the database
        List<NoteMaster> noteMasterList = noteMasterRepository.findAll();
        assertThat(noteMasterList).hasSize(databaseSizeBeforeCreate + 1);
        NoteMaster testNoteMaster = noteMasterList.get(noteMasterList.size() - 1);
        assertThat(testNoteMaster.getSemestre()).isEqualTo(DEFAULT_SEMESTRE);
        assertThat(testNoteMaster.getNoteCC1()).isEqualTo(DEFAULT_NOTE_CC_1);
        assertThat(testNoteMaster.getNoteCC2()).isEqualTo(DEFAULT_NOTE_CC_2);
        assertThat(testNoteMaster.getNoteFinal()).isEqualTo(DEFAULT_NOTE_FINAL);
        assertThat(testNoteMaster.getDate()).isEqualTo(DEFAULT_DATE);

        // Validate the NoteMaster in Elasticsearch
        verify(mockNoteMasterSearchRepository, times(1)).save(testNoteMaster);
    }

    @Test
    @Transactional
    public void createNoteMasterWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = noteMasterRepository.findAll().size();

        // Create the NoteMaster with an existing ID
        noteMaster.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restNoteMasterMockMvc.perform(post("/api/note-masters")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(noteMaster)))
            .andExpect(status().isBadRequest());

        // Validate the NoteMaster in the database
        List<NoteMaster> noteMasterList = noteMasterRepository.findAll();
        assertThat(noteMasterList).hasSize(databaseSizeBeforeCreate);

        // Validate the NoteMaster in Elasticsearch
        verify(mockNoteMasterSearchRepository, times(0)).save(noteMaster);
    }


    @Test
    @Transactional
    public void getAllNoteMasters() throws Exception {
        // Initialize the database
        noteMasterRepository.saveAndFlush(noteMaster);

        // Get all the noteMasterList
        restNoteMasterMockMvc.perform(get("/api/note-masters?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(noteMaster.getId().intValue())))
            .andExpect(jsonPath("$.[*].semestre").value(hasItem(DEFAULT_SEMESTRE.toString())))
            .andExpect(jsonPath("$.[*].noteCC1").value(hasItem(DEFAULT_NOTE_CC_1.doubleValue())))
            .andExpect(jsonPath("$.[*].noteCC2").value(hasItem(DEFAULT_NOTE_CC_2.doubleValue())))
            .andExpect(jsonPath("$.[*].noteFinal").value(hasItem(DEFAULT_NOTE_FINAL.doubleValue())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())));
    }
    
    @Test
    @Transactional
    public void getNoteMaster() throws Exception {
        // Initialize the database
        noteMasterRepository.saveAndFlush(noteMaster);

        // Get the noteMaster
        restNoteMasterMockMvc.perform(get("/api/note-masters/{id}", noteMaster.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(noteMaster.getId().intValue()))
            .andExpect(jsonPath("$.semestre").value(DEFAULT_SEMESTRE.toString()))
            .andExpect(jsonPath("$.noteCC1").value(DEFAULT_NOTE_CC_1.doubleValue()))
            .andExpect(jsonPath("$.noteCC2").value(DEFAULT_NOTE_CC_2.doubleValue()))
            .andExpect(jsonPath("$.noteFinal").value(DEFAULT_NOTE_FINAL.doubleValue()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingNoteMaster() throws Exception {
        // Get the noteMaster
        restNoteMasterMockMvc.perform(get("/api/note-masters/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateNoteMaster() throws Exception {
        // Initialize the database
        noteMasterRepository.saveAndFlush(noteMaster);

        int databaseSizeBeforeUpdate = noteMasterRepository.findAll().size();

        // Update the noteMaster
        NoteMaster updatedNoteMaster = noteMasterRepository.findById(noteMaster.getId()).get();
        // Disconnect from session so that the updates on updatedNoteMaster are not directly saved in db
        em.detach(updatedNoteMaster);
        updatedNoteMaster
            .semestre(UPDATED_SEMESTRE)
            .noteCC1(UPDATED_NOTE_CC_1)
            .noteCC2(UPDATED_NOTE_CC_2)
            .noteFinal(UPDATED_NOTE_FINAL)
            .date(UPDATED_DATE);

        restNoteMasterMockMvc.perform(put("/api/note-masters")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedNoteMaster)))
            .andExpect(status().isOk());

        // Validate the NoteMaster in the database
        List<NoteMaster> noteMasterList = noteMasterRepository.findAll();
        assertThat(noteMasterList).hasSize(databaseSizeBeforeUpdate);
        NoteMaster testNoteMaster = noteMasterList.get(noteMasterList.size() - 1);
        assertThat(testNoteMaster.getSemestre()).isEqualTo(UPDATED_SEMESTRE);
        assertThat(testNoteMaster.getNoteCC1()).isEqualTo(UPDATED_NOTE_CC_1);
        assertThat(testNoteMaster.getNoteCC2()).isEqualTo(UPDATED_NOTE_CC_2);
        assertThat(testNoteMaster.getNoteFinal()).isEqualTo(UPDATED_NOTE_FINAL);
        assertThat(testNoteMaster.getDate()).isEqualTo(UPDATED_DATE);

        // Validate the NoteMaster in Elasticsearch
        verify(mockNoteMasterSearchRepository, times(1)).save(testNoteMaster);
    }

    @Test
    @Transactional
    public void updateNonExistingNoteMaster() throws Exception {
        int databaseSizeBeforeUpdate = noteMasterRepository.findAll().size();

        // Create the NoteMaster

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restNoteMasterMockMvc.perform(put("/api/note-masters")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(noteMaster)))
            .andExpect(status().isBadRequest());

        // Validate the NoteMaster in the database
        List<NoteMaster> noteMasterList = noteMasterRepository.findAll();
        assertThat(noteMasterList).hasSize(databaseSizeBeforeUpdate);

        // Validate the NoteMaster in Elasticsearch
        verify(mockNoteMasterSearchRepository, times(0)).save(noteMaster);
    }

    @Test
    @Transactional
    public void deleteNoteMaster() throws Exception {
        // Initialize the database
        noteMasterRepository.saveAndFlush(noteMaster);

        int databaseSizeBeforeDelete = noteMasterRepository.findAll().size();

        // Delete the noteMaster
        restNoteMasterMockMvc.perform(delete("/api/note-masters/{id}", noteMaster.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<NoteMaster> noteMasterList = noteMasterRepository.findAll();
        assertThat(noteMasterList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the NoteMaster in Elasticsearch
        verify(mockNoteMasterSearchRepository, times(1)).deleteById(noteMaster.getId());
    }

    @Test
    @Transactional
    public void searchNoteMaster() throws Exception {
        // Initialize the database
        noteMasterRepository.saveAndFlush(noteMaster);
        when(mockNoteMasterSearchRepository.search(queryStringQuery("id:" + noteMaster.getId())))
            .thenReturn(Collections.singletonList(noteMaster));
        // Search the noteMaster
        restNoteMasterMockMvc.perform(get("/api/_search/note-masters?query=id:" + noteMaster.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(noteMaster.getId().intValue())))
            .andExpect(jsonPath("$.[*].semestre").value(hasItem(DEFAULT_SEMESTRE.toString())))
            .andExpect(jsonPath("$.[*].noteCC1").value(hasItem(DEFAULT_NOTE_CC_1.doubleValue())))
            .andExpect(jsonPath("$.[*].noteCC2").value(hasItem(DEFAULT_NOTE_CC_2.doubleValue())))
            .andExpect(jsonPath("$.[*].noteFinal").value(hasItem(DEFAULT_NOTE_FINAL.doubleValue())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(NoteMaster.class);
        NoteMaster noteMaster1 = new NoteMaster();
        noteMaster1.setId(1L);
        NoteMaster noteMaster2 = new NoteMaster();
        noteMaster2.setId(noteMaster1.getId());
        assertThat(noteMaster1).isEqualTo(noteMaster2);
        noteMaster2.setId(2L);
        assertThat(noteMaster1).isNotEqualTo(noteMaster2);
        noteMaster1.setId(null);
        assertThat(noteMaster1).isNotEqualTo(noteMaster2);
    }
}
