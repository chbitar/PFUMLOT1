package com.planeta.pfum.web.rest;

import static com.planeta.pfum.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.List;

import javax.persistence.EntityManager;

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

import com.planeta.pfum.PfumApp;
import com.planeta.pfum.domain.FicheAbsence;
import com.planeta.pfum.repository.FicheAbsenceRepository;
import com.planeta.pfum.repository.UserRepository;
import com.planeta.pfum.web.rest.errors.ExceptionTranslator;

/**
 * Integration tests for the {@Link FicheAbsenceResource} REST controller.
 */
@SpringBootTest(classes = PfumApp.class)
public class FicheAbsenceResourceIT {

    private static final Instant DEFAULT_DATE_SEANCE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE_SEANCE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private FicheAbsenceRepository ficheAbsenceRepository;
    
    @Autowired
    private UserRepository userRepository;

    /**
     * This repository is mocked in the com.planeta.pfum.repository.search test package.
     *
     * @see com.planeta.pfum.repository.search.FicheAbsenceSearchRepositoryMockConfiguration
     */

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

    private MockMvc restFicheAbsenceMockMvc;

    private FicheAbsence ficheAbsence;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final FicheAbsenceResource ficheAbsenceResource = new FicheAbsenceResource(ficheAbsenceRepository,userRepository);
        this.restFicheAbsenceMockMvc = MockMvcBuilders.standaloneSetup(ficheAbsenceResource)
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
    public static FicheAbsence createEntity(EntityManager em) {
        FicheAbsence ficheAbsence = new FicheAbsence()
            .dateSeance(DEFAULT_DATE_SEANCE);
        return ficheAbsence;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static FicheAbsence createUpdatedEntity(EntityManager em) {
        FicheAbsence ficheAbsence = new FicheAbsence()
            .dateSeance(UPDATED_DATE_SEANCE);
        return ficheAbsence;
    }

    @BeforeEach
    public void initTest() {
        ficheAbsence = createEntity(em);
    }

    @Test
    @Transactional
    public void createFicheAbsence() throws Exception {
        int databaseSizeBeforeCreate = ficheAbsenceRepository.findAll().size();

        // Create the FicheAbsence
        restFicheAbsenceMockMvc.perform(post("/api/fiche-absences")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ficheAbsence)))
            .andExpect(status().isCreated());

        // Validate the FicheAbsence in the database
        List<FicheAbsence> ficheAbsenceList = ficheAbsenceRepository.findAll();
        assertThat(ficheAbsenceList).hasSize(databaseSizeBeforeCreate + 1);
        FicheAbsence testFicheAbsence = ficheAbsenceList.get(ficheAbsenceList.size() - 1);
        assertThat(testFicheAbsence.getDateSeance()).isEqualTo(DEFAULT_DATE_SEANCE);

        // Validate the FicheAbsence in Elasticsearch
    }

    @Test
    @Transactional
    public void createFicheAbsenceWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = ficheAbsenceRepository.findAll().size();

        // Create the FicheAbsence with an existing ID
        ficheAbsence.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFicheAbsenceMockMvc.perform(post("/api/fiche-absences")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ficheAbsence)))
            .andExpect(status().isBadRequest());

        // Validate the FicheAbsence in the database
        List<FicheAbsence> ficheAbsenceList = ficheAbsenceRepository.findAll();
        assertThat(ficheAbsenceList).hasSize(databaseSizeBeforeCreate);

    }


    @Test
    @Transactional
    public void checkDateSeanceIsRequired() throws Exception {
        int databaseSizeBeforeTest = ficheAbsenceRepository.findAll().size();
        // set the field null
        ficheAbsence.setDateSeance(null);

        // Create the FicheAbsence, which fails.

        restFicheAbsenceMockMvc.perform(post("/api/fiche-absences")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ficheAbsence)))
            .andExpect(status().isBadRequest());

        List<FicheAbsence> ficheAbsenceList = ficheAbsenceRepository.findAll();
        assertThat(ficheAbsenceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllFicheAbsences() throws Exception {
        // Initialize the database
        ficheAbsenceRepository.saveAndFlush(ficheAbsence);

        // Get all the ficheAbsenceList
        restFicheAbsenceMockMvc.perform(get("/api/fiche-absences?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ficheAbsence.getId().intValue())))
            .andExpect(jsonPath("$.[*].dateSeance").value(hasItem(DEFAULT_DATE_SEANCE.toString())));
    }
    
    @Test
    @Transactional
    public void getFicheAbsence() throws Exception {
        // Initialize the database
        ficheAbsenceRepository.saveAndFlush(ficheAbsence);

        // Get the ficheAbsence
        restFicheAbsenceMockMvc.perform(get("/api/fiche-absences/{id}", ficheAbsence.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(ficheAbsence.getId().intValue()))
            .andExpect(jsonPath("$.dateSeance").value(DEFAULT_DATE_SEANCE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingFicheAbsence() throws Exception {
        // Get the ficheAbsence
        restFicheAbsenceMockMvc.perform(get("/api/fiche-absences/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFicheAbsence() throws Exception {
        // Initialize the database
        ficheAbsenceRepository.saveAndFlush(ficheAbsence);

        int databaseSizeBeforeUpdate = ficheAbsenceRepository.findAll().size();

        // Update the ficheAbsence
        FicheAbsence updatedFicheAbsence = ficheAbsenceRepository.findById(ficheAbsence.getId()).get();
        // Disconnect from session so that the updates on updatedFicheAbsence are not directly saved in db
        em.detach(updatedFicheAbsence);
        updatedFicheAbsence
            .dateSeance(UPDATED_DATE_SEANCE);

        restFicheAbsenceMockMvc.perform(put("/api/fiche-absences")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedFicheAbsence)))
            .andExpect(status().isOk());

        // Validate the FicheAbsence in the database
        List<FicheAbsence> ficheAbsenceList = ficheAbsenceRepository.findAll();
        assertThat(ficheAbsenceList).hasSize(databaseSizeBeforeUpdate);
        FicheAbsence testFicheAbsence = ficheAbsenceList.get(ficheAbsenceList.size() - 1);
        assertThat(testFicheAbsence.getDateSeance()).isEqualTo(UPDATED_DATE_SEANCE);

        // Validate the FicheAbsence in Elasticsearch
    }

    @Test
    @Transactional
    public void updateNonExistingFicheAbsence() throws Exception {
        int databaseSizeBeforeUpdate = ficheAbsenceRepository.findAll().size();

        // Create the FicheAbsence

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFicheAbsenceMockMvc.perform(put("/api/fiche-absences")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ficheAbsence)))
            .andExpect(status().isBadRequest());

        // Validate the FicheAbsence in the database
        List<FicheAbsence> ficheAbsenceList = ficheAbsenceRepository.findAll();
        assertThat(ficheAbsenceList).hasSize(databaseSizeBeforeUpdate);

        // Validate the FicheAbsence in Elasticsearch
    }

    @Test
    @Transactional
    public void deleteFicheAbsence() throws Exception {
        // Initialize the database
        ficheAbsenceRepository.saveAndFlush(ficheAbsence);

        int databaseSizeBeforeDelete = ficheAbsenceRepository.findAll().size();

        // Delete the ficheAbsence
        restFicheAbsenceMockMvc.perform(delete("/api/fiche-absences/{id}", ficheAbsence.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<FicheAbsence> ficheAbsenceList = ficheAbsenceRepository.findAll();
        assertThat(ficheAbsenceList).hasSize(databaseSizeBeforeDelete - 1);

    }

    @Test
    @Transactional
    public void searchFicheAbsence() throws Exception {
        // Initialize the database
        ficheAbsenceRepository.saveAndFlush(ficheAbsence);
        // Search the ficheAbsence
        restFicheAbsenceMockMvc.perform(get("/api/_search/fiche-absences?query=id:" + ficheAbsence.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ficheAbsence.getId().intValue())))
            .andExpect(jsonPath("$.[*].dateSeance").value(hasItem(DEFAULT_DATE_SEANCE.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(FicheAbsence.class);
        FicheAbsence ficheAbsence1 = new FicheAbsence();
        ficheAbsence1.setId(1L);
        FicheAbsence ficheAbsence2 = new FicheAbsence();
        ficheAbsence2.setId(ficheAbsence1.getId());
        assertThat(ficheAbsence1).isEqualTo(ficheAbsence2);
        ficheAbsence2.setId(2L);
        assertThat(ficheAbsence1).isNotEqualTo(ficheAbsence2);
        ficheAbsence1.setId(null);
        assertThat(ficheAbsence1).isNotEqualTo(ficheAbsence2);
    }
}
