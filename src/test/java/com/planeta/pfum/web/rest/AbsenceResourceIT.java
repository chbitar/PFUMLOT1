package com.planeta.pfum.web.rest;

import com.planeta.pfum.Pfumv10App;
import com.planeta.pfum.domain.Absence;
import com.planeta.pfum.repository.AbsenceRepository;
import com.planeta.pfum.repository.search.AbsenceSearchRepository;
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

/**
 * Integration tests for the {@Link AbsenceResource} REST controller.
 */
@SpringBootTest(classes = Pfumv10App.class)
public class AbsenceResourceIT {

    private static final Boolean DEFAULT_ABSENT = false;
    private static final Boolean UPDATED_ABSENT = true;

    private static final Instant DEFAULT_DATE_SEANCE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE_SEANCE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private AbsenceRepository absenceRepository;

    /**
     * This repository is mocked in the com.planeta.pfum.repository.search test package.
     *
     * @see com.planeta.pfum.repository.search.AbsenceSearchRepositoryMockConfiguration
     */
    @Autowired
    private AbsenceSearchRepository mockAbsenceSearchRepository;

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

    private MockMvc restAbsenceMockMvc;

    private Absence absence;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AbsenceResource absenceResource = new AbsenceResource(absenceRepository, mockAbsenceSearchRepository);
        this.restAbsenceMockMvc = MockMvcBuilders.standaloneSetup(absenceResource)
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
    public static Absence createEntity(EntityManager em) {
        Absence absence = new Absence()
            .absent(DEFAULT_ABSENT)
            .dateSeance(DEFAULT_DATE_SEANCE);
        return absence;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Absence createUpdatedEntity(EntityManager em) {
        Absence absence = new Absence()
            .absent(UPDATED_ABSENT)
            .dateSeance(UPDATED_DATE_SEANCE);
        return absence;
    }

    @BeforeEach
    public void initTest() {
        absence = createEntity(em);
    }

    @Test
    @Transactional
    public void createAbsence() throws Exception {
        int databaseSizeBeforeCreate = absenceRepository.findAll().size();

        // Create the Absence
        restAbsenceMockMvc.perform(post("/api/absences")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(absence)))
            .andExpect(status().isCreated());

        // Validate the Absence in the database
        List<Absence> absenceList = absenceRepository.findAll();
        assertThat(absenceList).hasSize(databaseSizeBeforeCreate + 1);
        Absence testAbsence = absenceList.get(absenceList.size() - 1);
        assertThat(testAbsence.isAbsent()).isEqualTo(DEFAULT_ABSENT);
        assertThat(testAbsence.getDateSeance()).isEqualTo(DEFAULT_DATE_SEANCE);

        // Validate the Absence in Elasticsearch
        verify(mockAbsenceSearchRepository, times(1)).save(testAbsence);
    }

    @Test
    @Transactional
    public void createAbsenceWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = absenceRepository.findAll().size();

        // Create the Absence with an existing ID
        absence.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAbsenceMockMvc.perform(post("/api/absences")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(absence)))
            .andExpect(status().isBadRequest());

        // Validate the Absence in the database
        List<Absence> absenceList = absenceRepository.findAll();
        assertThat(absenceList).hasSize(databaseSizeBeforeCreate);

        // Validate the Absence in Elasticsearch
        verify(mockAbsenceSearchRepository, times(0)).save(absence);
    }


    @Test
    @Transactional
    public void getAllAbsences() throws Exception {
        // Initialize the database
        absenceRepository.saveAndFlush(absence);

        // Get all the absenceList
        restAbsenceMockMvc.perform(get("/api/absences?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(absence.getId().intValue())))
            .andExpect(jsonPath("$.[*].absent").value(hasItem(DEFAULT_ABSENT.booleanValue())))
            .andExpect(jsonPath("$.[*].dateSeance").value(hasItem(DEFAULT_DATE_SEANCE.toString())));
    }
    
    @Test
    @Transactional
    public void getAbsence() throws Exception {
        // Initialize the database
        absenceRepository.saveAndFlush(absence);

        // Get the absence
        restAbsenceMockMvc.perform(get("/api/absences/{id}", absence.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(absence.getId().intValue()))
            .andExpect(jsonPath("$.absent").value(DEFAULT_ABSENT.booleanValue()))
            .andExpect(jsonPath("$.dateSeance").value(DEFAULT_DATE_SEANCE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingAbsence() throws Exception {
        // Get the absence
        restAbsenceMockMvc.perform(get("/api/absences/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAbsence() throws Exception {
        // Initialize the database
        absenceRepository.saveAndFlush(absence);

        int databaseSizeBeforeUpdate = absenceRepository.findAll().size();

        // Update the absence
        Absence updatedAbsence = absenceRepository.findById(absence.getId()).get();
        // Disconnect from session so that the updates on updatedAbsence are not directly saved in db
        em.detach(updatedAbsence);
        updatedAbsence
            .absent(UPDATED_ABSENT)
            .dateSeance(UPDATED_DATE_SEANCE);

        restAbsenceMockMvc.perform(put("/api/absences")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAbsence)))
            .andExpect(status().isOk());

        // Validate the Absence in the database
        List<Absence> absenceList = absenceRepository.findAll();
        assertThat(absenceList).hasSize(databaseSizeBeforeUpdate);
        Absence testAbsence = absenceList.get(absenceList.size() - 1);
        assertThat(testAbsence.isAbsent()).isEqualTo(UPDATED_ABSENT);
        assertThat(testAbsence.getDateSeance()).isEqualTo(UPDATED_DATE_SEANCE);

        // Validate the Absence in Elasticsearch
        verify(mockAbsenceSearchRepository, times(1)).save(testAbsence);
    }

    @Test
    @Transactional
    public void updateNonExistingAbsence() throws Exception {
        int databaseSizeBeforeUpdate = absenceRepository.findAll().size();

        // Create the Absence

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAbsenceMockMvc.perform(put("/api/absences")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(absence)))
            .andExpect(status().isBadRequest());

        // Validate the Absence in the database
        List<Absence> absenceList = absenceRepository.findAll();
        assertThat(absenceList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Absence in Elasticsearch
        verify(mockAbsenceSearchRepository, times(0)).save(absence);
    }

    @Test
    @Transactional
    public void deleteAbsence() throws Exception {
        // Initialize the database
        absenceRepository.saveAndFlush(absence);

        int databaseSizeBeforeDelete = absenceRepository.findAll().size();

        // Delete the absence
        restAbsenceMockMvc.perform(delete("/api/absences/{id}", absence.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Absence> absenceList = absenceRepository.findAll();
        assertThat(absenceList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Absence in Elasticsearch
        verify(mockAbsenceSearchRepository, times(1)).deleteById(absence.getId());
    }

    @Test
    @Transactional
    public void searchAbsence() throws Exception {
        // Initialize the database
        absenceRepository.saveAndFlush(absence);
        when(mockAbsenceSearchRepository.search(queryStringQuery("id:" + absence.getId())))
            .thenReturn(Collections.singletonList(absence));
        // Search the absence
        restAbsenceMockMvc.perform(get("/api/_search/absences?query=id:" + absence.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(absence.getId().intValue())))
            .andExpect(jsonPath("$.[*].absent").value(hasItem(DEFAULT_ABSENT.booleanValue())))
            .andExpect(jsonPath("$.[*].dateSeance").value(hasItem(DEFAULT_DATE_SEANCE.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Absence.class);
        Absence absence1 = new Absence();
        absence1.setId(1L);
        Absence absence2 = new Absence();
        absence2.setId(absence1.getId());
        assertThat(absence1).isEqualTo(absence2);
        absence2.setId(2L);
        assertThat(absence1).isNotEqualTo(absence2);
        absence1.setId(null);
        assertThat(absence1).isNotEqualTo(absence2);
    }
}
