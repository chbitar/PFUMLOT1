package com.planeta.pfum.web.rest;

import com.planeta.pfum.Pfumv10App;
import com.planeta.pfum.domain.NoteExecutif;
import com.planeta.pfum.repository.NoteExecutifRepository;
import com.planeta.pfum.repository.search.NoteExecutifSearchRepository;
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
 * Integration tests for the {@Link NoteExecutifResource} REST controller.
 */
@SpringBootTest(classes = Pfumv10App.class)
public class NoteExecutifResourceIT {

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
    private NoteExecutifRepository noteExecutifRepository;

    /**
     * This repository is mocked in the com.planeta.pfum.repository.search test package.
     *
     * @see com.planeta.pfum.repository.search.NoteExecutifSearchRepositoryMockConfiguration
     */
    @Autowired
    private NoteExecutifSearchRepository mockNoteExecutifSearchRepository;

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

    private MockMvc restNoteExecutifMockMvc;

    private NoteExecutif noteExecutif;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final NoteExecutifResource noteExecutifResource = new NoteExecutifResource(noteExecutifRepository, mockNoteExecutifSearchRepository);
        this.restNoteExecutifMockMvc = MockMvcBuilders.standaloneSetup(noteExecutifResource)
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
    public static NoteExecutif createEntity(EntityManager em) {
        NoteExecutif noteExecutif = new NoteExecutif()
            .semestre(DEFAULT_SEMESTRE)
            .noteCC1(DEFAULT_NOTE_CC_1)
            .noteCC2(DEFAULT_NOTE_CC_2)
            .noteFinal(DEFAULT_NOTE_FINAL)
            .date(DEFAULT_DATE);
        return noteExecutif;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static NoteExecutif createUpdatedEntity(EntityManager em) {
        NoteExecutif noteExecutif = new NoteExecutif()
            .semestre(UPDATED_SEMESTRE)
            .noteCC1(UPDATED_NOTE_CC_1)
            .noteCC2(UPDATED_NOTE_CC_2)
            .noteFinal(UPDATED_NOTE_FINAL)
            .date(UPDATED_DATE);
        return noteExecutif;
    }

    @BeforeEach
    public void initTest() {
        noteExecutif = createEntity(em);
    }

    @Test
    @Transactional
    public void createNoteExecutif() throws Exception {
        int databaseSizeBeforeCreate = noteExecutifRepository.findAll().size();

        // Create the NoteExecutif
        restNoteExecutifMockMvc.perform(post("/api/note-executifs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(noteExecutif)))
            .andExpect(status().isCreated());

        // Validate the NoteExecutif in the database
        List<NoteExecutif> noteExecutifList = noteExecutifRepository.findAll();
        assertThat(noteExecutifList).hasSize(databaseSizeBeforeCreate + 1);
        NoteExecutif testNoteExecutif = noteExecutifList.get(noteExecutifList.size() - 1);
        assertThat(testNoteExecutif.getSemestre()).isEqualTo(DEFAULT_SEMESTRE);
        assertThat(testNoteExecutif.getNoteCC1()).isEqualTo(DEFAULT_NOTE_CC_1);
        assertThat(testNoteExecutif.getNoteCC2()).isEqualTo(DEFAULT_NOTE_CC_2);
        assertThat(testNoteExecutif.getNoteFinal()).isEqualTo(DEFAULT_NOTE_FINAL);
        assertThat(testNoteExecutif.getDate()).isEqualTo(DEFAULT_DATE);

        // Validate the NoteExecutif in Elasticsearch
        verify(mockNoteExecutifSearchRepository, times(1)).save(testNoteExecutif);
    }

    @Test
    @Transactional
    public void createNoteExecutifWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = noteExecutifRepository.findAll().size();

        // Create the NoteExecutif with an existing ID
        noteExecutif.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restNoteExecutifMockMvc.perform(post("/api/note-executifs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(noteExecutif)))
            .andExpect(status().isBadRequest());

        // Validate the NoteExecutif in the database
        List<NoteExecutif> noteExecutifList = noteExecutifRepository.findAll();
        assertThat(noteExecutifList).hasSize(databaseSizeBeforeCreate);

        // Validate the NoteExecutif in Elasticsearch
        verify(mockNoteExecutifSearchRepository, times(0)).save(noteExecutif);
    }


    @Test
    @Transactional
    public void getAllNoteExecutifs() throws Exception {
        // Initialize the database
        noteExecutifRepository.saveAndFlush(noteExecutif);

        // Get all the noteExecutifList
        restNoteExecutifMockMvc.perform(get("/api/note-executifs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(noteExecutif.getId().intValue())))
            .andExpect(jsonPath("$.[*].semestre").value(hasItem(DEFAULT_SEMESTRE.toString())))
            .andExpect(jsonPath("$.[*].noteCC1").value(hasItem(DEFAULT_NOTE_CC_1.doubleValue())))
            .andExpect(jsonPath("$.[*].noteCC2").value(hasItem(DEFAULT_NOTE_CC_2.doubleValue())))
            .andExpect(jsonPath("$.[*].noteFinal").value(hasItem(DEFAULT_NOTE_FINAL.doubleValue())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())));
    }
    
    @Test
    @Transactional
    public void getNoteExecutif() throws Exception {
        // Initialize the database
        noteExecutifRepository.saveAndFlush(noteExecutif);

        // Get the noteExecutif
        restNoteExecutifMockMvc.perform(get("/api/note-executifs/{id}", noteExecutif.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(noteExecutif.getId().intValue()))
            .andExpect(jsonPath("$.semestre").value(DEFAULT_SEMESTRE.toString()))
            .andExpect(jsonPath("$.noteCC1").value(DEFAULT_NOTE_CC_1.doubleValue()))
            .andExpect(jsonPath("$.noteCC2").value(DEFAULT_NOTE_CC_2.doubleValue()))
            .andExpect(jsonPath("$.noteFinal").value(DEFAULT_NOTE_FINAL.doubleValue()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingNoteExecutif() throws Exception {
        // Get the noteExecutif
        restNoteExecutifMockMvc.perform(get("/api/note-executifs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateNoteExecutif() throws Exception {
        // Initialize the database
        noteExecutifRepository.saveAndFlush(noteExecutif);

        int databaseSizeBeforeUpdate = noteExecutifRepository.findAll().size();

        // Update the noteExecutif
        NoteExecutif updatedNoteExecutif = noteExecutifRepository.findById(noteExecutif.getId()).get();
        // Disconnect from session so that the updates on updatedNoteExecutif are not directly saved in db
        em.detach(updatedNoteExecutif);
        updatedNoteExecutif
            .semestre(UPDATED_SEMESTRE)
            .noteCC1(UPDATED_NOTE_CC_1)
            .noteCC2(UPDATED_NOTE_CC_2)
            .noteFinal(UPDATED_NOTE_FINAL)
            .date(UPDATED_DATE);

        restNoteExecutifMockMvc.perform(put("/api/note-executifs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedNoteExecutif)))
            .andExpect(status().isOk());

        // Validate the NoteExecutif in the database
        List<NoteExecutif> noteExecutifList = noteExecutifRepository.findAll();
        assertThat(noteExecutifList).hasSize(databaseSizeBeforeUpdate);
        NoteExecutif testNoteExecutif = noteExecutifList.get(noteExecutifList.size() - 1);
        assertThat(testNoteExecutif.getSemestre()).isEqualTo(UPDATED_SEMESTRE);
        assertThat(testNoteExecutif.getNoteCC1()).isEqualTo(UPDATED_NOTE_CC_1);
        assertThat(testNoteExecutif.getNoteCC2()).isEqualTo(UPDATED_NOTE_CC_2);
        assertThat(testNoteExecutif.getNoteFinal()).isEqualTo(UPDATED_NOTE_FINAL);
        assertThat(testNoteExecutif.getDate()).isEqualTo(UPDATED_DATE);

        // Validate the NoteExecutif in Elasticsearch
        verify(mockNoteExecutifSearchRepository, times(1)).save(testNoteExecutif);
    }

    @Test
    @Transactional
    public void updateNonExistingNoteExecutif() throws Exception {
        int databaseSizeBeforeUpdate = noteExecutifRepository.findAll().size();

        // Create the NoteExecutif

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restNoteExecutifMockMvc.perform(put("/api/note-executifs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(noteExecutif)))
            .andExpect(status().isBadRequest());

        // Validate the NoteExecutif in the database
        List<NoteExecutif> noteExecutifList = noteExecutifRepository.findAll();
        assertThat(noteExecutifList).hasSize(databaseSizeBeforeUpdate);

        // Validate the NoteExecutif in Elasticsearch
        verify(mockNoteExecutifSearchRepository, times(0)).save(noteExecutif);
    }

    @Test
    @Transactional
    public void deleteNoteExecutif() throws Exception {
        // Initialize the database
        noteExecutifRepository.saveAndFlush(noteExecutif);

        int databaseSizeBeforeDelete = noteExecutifRepository.findAll().size();

        // Delete the noteExecutif
        restNoteExecutifMockMvc.perform(delete("/api/note-executifs/{id}", noteExecutif.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<NoteExecutif> noteExecutifList = noteExecutifRepository.findAll();
        assertThat(noteExecutifList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the NoteExecutif in Elasticsearch
        verify(mockNoteExecutifSearchRepository, times(1)).deleteById(noteExecutif.getId());
    }

    @Test
    @Transactional
    public void searchNoteExecutif() throws Exception {
        // Initialize the database
        noteExecutifRepository.saveAndFlush(noteExecutif);
        when(mockNoteExecutifSearchRepository.search(queryStringQuery("id:" + noteExecutif.getId())))
            .thenReturn(Collections.singletonList(noteExecutif));
        // Search the noteExecutif
        restNoteExecutifMockMvc.perform(get("/api/_search/note-executifs?query=id:" + noteExecutif.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(noteExecutif.getId().intValue())))
            .andExpect(jsonPath("$.[*].semestre").value(hasItem(DEFAULT_SEMESTRE.toString())))
            .andExpect(jsonPath("$.[*].noteCC1").value(hasItem(DEFAULT_NOTE_CC_1.doubleValue())))
            .andExpect(jsonPath("$.[*].noteCC2").value(hasItem(DEFAULT_NOTE_CC_2.doubleValue())))
            .andExpect(jsonPath("$.[*].noteFinal").value(hasItem(DEFAULT_NOTE_FINAL.doubleValue())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(NoteExecutif.class);
        NoteExecutif noteExecutif1 = new NoteExecutif();
        noteExecutif1.setId(1L);
        NoteExecutif noteExecutif2 = new NoteExecutif();
        noteExecutif2.setId(noteExecutif1.getId());
        assertThat(noteExecutif1).isEqualTo(noteExecutif2);
        noteExecutif2.setId(2L);
        assertThat(noteExecutif1).isNotEqualTo(noteExecutif2);
        noteExecutif1.setId(null);
        assertThat(noteExecutif1).isNotEqualTo(noteExecutif2);
    }
}
