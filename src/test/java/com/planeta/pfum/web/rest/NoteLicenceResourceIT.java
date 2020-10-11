package com.planeta.pfum.web.rest;

import com.planeta.pfum.Pfumv10App;
import com.planeta.pfum.domain.NoteLicence;
import com.planeta.pfum.repository.NoteLicenceRepository;
import com.planeta.pfum.repository.search.NoteLicenceSearchRepository;
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
 * Integration tests for the {@Link NoteLicenceResource} REST controller.
 */
@SpringBootTest(classes = Pfumv10App.class)
public class NoteLicenceResourceIT {

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
    private NoteLicenceRepository noteLicenceRepository;

    /**
     * This repository is mocked in the com.planeta.pfum.repository.search test package.
     *
     * @see com.planeta.pfum.repository.search.NoteLicenceSearchRepositoryMockConfiguration
     */
    @Autowired
    private NoteLicenceSearchRepository mockNoteLicenceSearchRepository;

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

    private MockMvc restNoteLicenceMockMvc;

    private NoteLicence noteLicence;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final NoteLicenceResource noteLicenceResource = new NoteLicenceResource(noteLicenceRepository, mockNoteLicenceSearchRepository);
        this.restNoteLicenceMockMvc = MockMvcBuilders.standaloneSetup(noteLicenceResource)
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
    public static NoteLicence createEntity(EntityManager em) {
        NoteLicence noteLicence = new NoteLicence()
            .semestre(DEFAULT_SEMESTRE)
            .noteCC1(DEFAULT_NOTE_CC_1)
            .noteCC2(DEFAULT_NOTE_CC_2)
            .noteFinal(DEFAULT_NOTE_FINAL)
            .date(DEFAULT_DATE);
        return noteLicence;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static NoteLicence createUpdatedEntity(EntityManager em) {
        NoteLicence noteLicence = new NoteLicence()
            .semestre(UPDATED_SEMESTRE)
            .noteCC1(UPDATED_NOTE_CC_1)
            .noteCC2(UPDATED_NOTE_CC_2)
            .noteFinal(UPDATED_NOTE_FINAL)
            .date(UPDATED_DATE);
        return noteLicence;
    }

    @BeforeEach
    public void initTest() {
        noteLicence = createEntity(em);
    }

    @Test
    @Transactional
    public void createNoteLicence() throws Exception {
        int databaseSizeBeforeCreate = noteLicenceRepository.findAll().size();

        // Create the NoteLicence
        restNoteLicenceMockMvc.perform(post("/api/note-licences")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(noteLicence)))
            .andExpect(status().isCreated());

        // Validate the NoteLicence in the database
        List<NoteLicence> noteLicenceList = noteLicenceRepository.findAll();
        assertThat(noteLicenceList).hasSize(databaseSizeBeforeCreate + 1);
        NoteLicence testNoteLicence = noteLicenceList.get(noteLicenceList.size() - 1);
        assertThat(testNoteLicence.getSemestre()).isEqualTo(DEFAULT_SEMESTRE);
        assertThat(testNoteLicence.getNoteCC1()).isEqualTo(DEFAULT_NOTE_CC_1);
        assertThat(testNoteLicence.getNoteCC2()).isEqualTo(DEFAULT_NOTE_CC_2);
        assertThat(testNoteLicence.getNoteFinal()).isEqualTo(DEFAULT_NOTE_FINAL);
        assertThat(testNoteLicence.getDate()).isEqualTo(DEFAULT_DATE);

        // Validate the NoteLicence in Elasticsearch
        verify(mockNoteLicenceSearchRepository, times(1)).save(testNoteLicence);
    }

    @Test
    @Transactional
    public void createNoteLicenceWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = noteLicenceRepository.findAll().size();

        // Create the NoteLicence with an existing ID
        noteLicence.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restNoteLicenceMockMvc.perform(post("/api/note-licences")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(noteLicence)))
            .andExpect(status().isBadRequest());

        // Validate the NoteLicence in the database
        List<NoteLicence> noteLicenceList = noteLicenceRepository.findAll();
        assertThat(noteLicenceList).hasSize(databaseSizeBeforeCreate);

        // Validate the NoteLicence in Elasticsearch
        verify(mockNoteLicenceSearchRepository, times(0)).save(noteLicence);
    }


    @Test
    @Transactional
    public void getAllNoteLicences() throws Exception {
        // Initialize the database
        noteLicenceRepository.saveAndFlush(noteLicence);

        // Get all the noteLicenceList
        restNoteLicenceMockMvc.perform(get("/api/note-licences?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(noteLicence.getId().intValue())))
            .andExpect(jsonPath("$.[*].semestre").value(hasItem(DEFAULT_SEMESTRE.toString())))
            .andExpect(jsonPath("$.[*].noteCC1").value(hasItem(DEFAULT_NOTE_CC_1.doubleValue())))
            .andExpect(jsonPath("$.[*].noteCC2").value(hasItem(DEFAULT_NOTE_CC_2.doubleValue())))
            .andExpect(jsonPath("$.[*].noteFinal").value(hasItem(DEFAULT_NOTE_FINAL.doubleValue())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())));
    }
    
    @Test
    @Transactional
    public void getNoteLicence() throws Exception {
        // Initialize the database
        noteLicenceRepository.saveAndFlush(noteLicence);

        // Get the noteLicence
        restNoteLicenceMockMvc.perform(get("/api/note-licences/{id}", noteLicence.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(noteLicence.getId().intValue()))
            .andExpect(jsonPath("$.semestre").value(DEFAULT_SEMESTRE.toString()))
            .andExpect(jsonPath("$.noteCC1").value(DEFAULT_NOTE_CC_1.doubleValue()))
            .andExpect(jsonPath("$.noteCC2").value(DEFAULT_NOTE_CC_2.doubleValue()))
            .andExpect(jsonPath("$.noteFinal").value(DEFAULT_NOTE_FINAL.doubleValue()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingNoteLicence() throws Exception {
        // Get the noteLicence
        restNoteLicenceMockMvc.perform(get("/api/note-licences/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateNoteLicence() throws Exception {
        // Initialize the database
        noteLicenceRepository.saveAndFlush(noteLicence);

        int databaseSizeBeforeUpdate = noteLicenceRepository.findAll().size();

        // Update the noteLicence
        NoteLicence updatedNoteLicence = noteLicenceRepository.findById(noteLicence.getId()).get();
        // Disconnect from session so that the updates on updatedNoteLicence are not directly saved in db
        em.detach(updatedNoteLicence);
        updatedNoteLicence
            .semestre(UPDATED_SEMESTRE)
            .noteCC1(UPDATED_NOTE_CC_1)
            .noteCC2(UPDATED_NOTE_CC_2)
            .noteFinal(UPDATED_NOTE_FINAL)
            .date(UPDATED_DATE);

        restNoteLicenceMockMvc.perform(put("/api/note-licences")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedNoteLicence)))
            .andExpect(status().isOk());

        // Validate the NoteLicence in the database
        List<NoteLicence> noteLicenceList = noteLicenceRepository.findAll();
        assertThat(noteLicenceList).hasSize(databaseSizeBeforeUpdate);
        NoteLicence testNoteLicence = noteLicenceList.get(noteLicenceList.size() - 1);
        assertThat(testNoteLicence.getSemestre()).isEqualTo(UPDATED_SEMESTRE);
        assertThat(testNoteLicence.getNoteCC1()).isEqualTo(UPDATED_NOTE_CC_1);
        assertThat(testNoteLicence.getNoteCC2()).isEqualTo(UPDATED_NOTE_CC_2);
        assertThat(testNoteLicence.getNoteFinal()).isEqualTo(UPDATED_NOTE_FINAL);
        assertThat(testNoteLicence.getDate()).isEqualTo(UPDATED_DATE);

        // Validate the NoteLicence in Elasticsearch
        verify(mockNoteLicenceSearchRepository, times(1)).save(testNoteLicence);
    }

    @Test
    @Transactional
    public void updateNonExistingNoteLicence() throws Exception {
        int databaseSizeBeforeUpdate = noteLicenceRepository.findAll().size();

        // Create the NoteLicence

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restNoteLicenceMockMvc.perform(put("/api/note-licences")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(noteLicence)))
            .andExpect(status().isBadRequest());

        // Validate the NoteLicence in the database
        List<NoteLicence> noteLicenceList = noteLicenceRepository.findAll();
        assertThat(noteLicenceList).hasSize(databaseSizeBeforeUpdate);

        // Validate the NoteLicence in Elasticsearch
        verify(mockNoteLicenceSearchRepository, times(0)).save(noteLicence);
    }

    @Test
    @Transactional
    public void deleteNoteLicence() throws Exception {
        // Initialize the database
        noteLicenceRepository.saveAndFlush(noteLicence);

        int databaseSizeBeforeDelete = noteLicenceRepository.findAll().size();

        // Delete the noteLicence
        restNoteLicenceMockMvc.perform(delete("/api/note-licences/{id}", noteLicence.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<NoteLicence> noteLicenceList = noteLicenceRepository.findAll();
        assertThat(noteLicenceList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the NoteLicence in Elasticsearch
        verify(mockNoteLicenceSearchRepository, times(1)).deleteById(noteLicence.getId());
    }

    @Test
    @Transactional
    public void searchNoteLicence() throws Exception {
        // Initialize the database
        noteLicenceRepository.saveAndFlush(noteLicence);
        when(mockNoteLicenceSearchRepository.search(queryStringQuery("id:" + noteLicence.getId())))
            .thenReturn(Collections.singletonList(noteLicence));
        // Search the noteLicence
        restNoteLicenceMockMvc.perform(get("/api/_search/note-licences?query=id:" + noteLicence.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(noteLicence.getId().intValue())))
            .andExpect(jsonPath("$.[*].semestre").value(hasItem(DEFAULT_SEMESTRE.toString())))
            .andExpect(jsonPath("$.[*].noteCC1").value(hasItem(DEFAULT_NOTE_CC_1.doubleValue())))
            .andExpect(jsonPath("$.[*].noteCC2").value(hasItem(DEFAULT_NOTE_CC_2.doubleValue())))
            .andExpect(jsonPath("$.[*].noteFinal").value(hasItem(DEFAULT_NOTE_FINAL.doubleValue())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(NoteLicence.class);
        NoteLicence noteLicence1 = new NoteLicence();
        noteLicence1.setId(1L);
        NoteLicence noteLicence2 = new NoteLicence();
        noteLicence2.setId(noteLicence1.getId());
        assertThat(noteLicence1).isEqualTo(noteLicence2);
        noteLicence2.setId(2L);
        assertThat(noteLicence1).isNotEqualTo(noteLicence2);
        noteLicence1.setId(null);
        assertThat(noteLicence1).isNotEqualTo(noteLicence2);
    }
}
