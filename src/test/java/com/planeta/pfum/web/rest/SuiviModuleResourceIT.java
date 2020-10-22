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
import com.planeta.pfum.domain.Module;
import com.planeta.pfum.domain.SuiviModule;
import com.planeta.pfum.domain.User;
import com.planeta.pfum.domain.enumeration.Semestre;
import com.planeta.pfum.repository.SuiviModuleRepository;
import com.planeta.pfum.web.rest.errors.ExceptionTranslator;
/**
 * Integration tests for the {@Link SuiviModuleResource} REST controller.
 */
@SpringBootTest(classes = PfumApp.class)
public class SuiviModuleResourceIT {

    private static final Semestre DEFAULT_SEMESTRE = Semestre.S1;
    private static final Semestre UPDATED_SEMESTRE = Semestre.S2;

    private static final String DEFAULT_DESCRIPTIF = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTIF = "BBBBBBBBBB";

    private static final String DEFAULT_OBSERVATIONS = "AAAAAAAAAA";
    private static final String UPDATED_OBSERVATIONS = "BBBBBBBBBB";

    private static final Instant DEFAULT_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_DEBUT_CRENEAU = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DEBUT_CRENEAU = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_FIN_CRENEAU = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_FIN_CRENEAU = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Integer DEFAULT_DUREE = 1;
    private static final Integer UPDATED_DUREE = 2;

    @Autowired
    private SuiviModuleRepository suiviModuleRepository;


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

    private MockMvc restSuiviModuleMockMvc;

    private SuiviModule suiviModule;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SuiviModuleResource suiviModuleResource = new SuiviModuleResource(suiviModuleRepository);
        this.restSuiviModuleMockMvc = MockMvcBuilders.standaloneSetup(suiviModuleResource)
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
    public static SuiviModule createEntity(EntityManager em) {
        SuiviModule suiviModule = new SuiviModule()
            .semestre(DEFAULT_SEMESTRE)
            .descriptif(DEFAULT_DESCRIPTIF)
            .observations(DEFAULT_OBSERVATIONS)
            .date(DEFAULT_DATE)
            .debutCreneau(DEFAULT_DEBUT_CRENEAU)
            .finCreneau(DEFAULT_FIN_CRENEAU)
            .duree(DEFAULT_DUREE);
        return suiviModule;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SuiviModule createUpdatedEntity(EntityManager em) {
        SuiviModule suiviModule = new SuiviModule()
            .semestre(UPDATED_SEMESTRE)
            .descriptif(UPDATED_DESCRIPTIF)
            .observations(UPDATED_OBSERVATIONS)
            .date(UPDATED_DATE)
            .debutCreneau(UPDATED_DEBUT_CRENEAU)
            .finCreneau(UPDATED_FIN_CRENEAU)
            .duree(UPDATED_DUREE);
        return suiviModule;
    }

    @BeforeEach
    public void initTest() {
        suiviModule = createEntity(em);
    }

    @Test
    @Transactional
    public void createSuiviModule() throws Exception {
        int databaseSizeBeforeCreate = suiviModuleRepository.findAll().size();

        // Create the SuiviModule
        restSuiviModuleMockMvc.perform(post("/api/suivi-modules")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(suiviModule)))
            .andExpect(status().isCreated());

        // Validate the SuiviModule in the database
        List<SuiviModule> suiviModuleList = suiviModuleRepository.findAll();
        assertThat(suiviModuleList).hasSize(databaseSizeBeforeCreate + 1);
        SuiviModule testSuiviModule = suiviModuleList.get(suiviModuleList.size() - 1);
        assertThat(testSuiviModule.getSemestre()).isEqualTo(DEFAULT_SEMESTRE);
        assertThat(testSuiviModule.getDescriptif()).isEqualTo(DEFAULT_DESCRIPTIF);
        assertThat(testSuiviModule.getObservations()).isEqualTo(DEFAULT_OBSERVATIONS);
        assertThat(testSuiviModule.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testSuiviModule.getDebutCreneau()).isEqualTo(DEFAULT_DEBUT_CRENEAU);
        assertThat(testSuiviModule.getFinCreneau()).isEqualTo(DEFAULT_FIN_CRENEAU);
        assertThat(testSuiviModule.getDuree()).isEqualTo(DEFAULT_DUREE);
    }

    @Test
    @Transactional
    public void createSuiviModuleWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = suiviModuleRepository.findAll().size();

        // Create the SuiviModule with an existing ID
        suiviModule.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSuiviModuleMockMvc.perform(post("/api/suivi-modules")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(suiviModule)))
            .andExpect(status().isBadRequest());

        // Validate the SuiviModule in the database
        List<SuiviModule> suiviModuleList = suiviModuleRepository.findAll();
        assertThat(suiviModuleList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = suiviModuleRepository.findAll().size();
        // set the field null
        suiviModule.setDate(null);

        // Create the SuiviModule, which fails.

        restSuiviModuleMockMvc.perform(post("/api/suivi-modules")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(suiviModule)))
            .andExpect(status().isBadRequest());

        List<SuiviModule> suiviModuleList = suiviModuleRepository.findAll();
        assertThat(suiviModuleList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDebutCreneauIsRequired() throws Exception {
        int databaseSizeBeforeTest = suiviModuleRepository.findAll().size();
        // set the field null
        suiviModule.setDebutCreneau(null);

        // Create the SuiviModule, which fails.

        restSuiviModuleMockMvc.perform(post("/api/suivi-modules")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(suiviModule)))
            .andExpect(status().isBadRequest());

        List<SuiviModule> suiviModuleList = suiviModuleRepository.findAll();
        assertThat(suiviModuleList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkFinCreneauIsRequired() throws Exception {
        int databaseSizeBeforeTest = suiviModuleRepository.findAll().size();
        // set the field null
        suiviModule.setFinCreneau(null);

        // Create the SuiviModule, which fails.

        restSuiviModuleMockMvc.perform(post("/api/suivi-modules")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(suiviModule)))
            .andExpect(status().isBadRequest());

        List<SuiviModule> suiviModuleList = suiviModuleRepository.findAll();
        assertThat(suiviModuleList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDureeIsRequired() throws Exception {
        int databaseSizeBeforeTest = suiviModuleRepository.findAll().size();
        // set the field null
        suiviModule.setDuree(null);

        // Create the SuiviModule, which fails.

        restSuiviModuleMockMvc.perform(post("/api/suivi-modules")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(suiviModule)))
            .andExpect(status().isBadRequest());

        List<SuiviModule> suiviModuleList = suiviModuleRepository.findAll();
        assertThat(suiviModuleList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllSuiviModules() throws Exception {
        // Initialize the database
        suiviModuleRepository.saveAndFlush(suiviModule);

        // Get all the suiviModuleList
        restSuiviModuleMockMvc.perform(get("/api/suivi-modules?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(suiviModule.getId().intValue())))
            .andExpect(jsonPath("$.[*].semestre").value(hasItem(DEFAULT_SEMESTRE.toString())))
            .andExpect(jsonPath("$.[*].descriptif").value(hasItem(DEFAULT_DESCRIPTIF.toString())))
            .andExpect(jsonPath("$.[*].observations").value(hasItem(DEFAULT_OBSERVATIONS.toString())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].debutCreneau").value(hasItem(DEFAULT_DEBUT_CRENEAU.toString())))
            .andExpect(jsonPath("$.[*].finCreneau").value(hasItem(DEFAULT_FIN_CRENEAU.toString())))
            .andExpect(jsonPath("$.[*].duree").value(hasItem(DEFAULT_DUREE)));
    }
    
    @Test
    @Transactional
    public void getSuiviModule() throws Exception {
        // Initialize the database
        suiviModuleRepository.saveAndFlush(suiviModule);

        // Get the suiviModule
        restSuiviModuleMockMvc.perform(get("/api/suivi-modules/{id}", suiviModule.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(suiviModule.getId().intValue()))
            .andExpect(jsonPath("$.semestre").value(DEFAULT_SEMESTRE.toString()))
            .andExpect(jsonPath("$.descriptif").value(DEFAULT_DESCRIPTIF.toString()))
            .andExpect(jsonPath("$.observations").value(DEFAULT_OBSERVATIONS.toString()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()))
            .andExpect(jsonPath("$.debutCreneau").value(DEFAULT_DEBUT_CRENEAU.toString()))
            .andExpect(jsonPath("$.finCreneau").value(DEFAULT_FIN_CRENEAU.toString()))
            .andExpect(jsonPath("$.duree").value(DEFAULT_DUREE));
    }

    @Test
    @Transactional
    public void getAllSuiviModulesBySemestreIsEqualToSomething() throws Exception {
        // Initialize the database
        suiviModuleRepository.saveAndFlush(suiviModule);

        // Get all the suiviModuleList where semestre equals to DEFAULT_SEMESTRE
        defaultSuiviModuleShouldBeFound("semestre.equals=" + DEFAULT_SEMESTRE);

        // Get all the suiviModuleList where semestre equals to UPDATED_SEMESTRE
        defaultSuiviModuleShouldNotBeFound("semestre.equals=" + UPDATED_SEMESTRE);
    }

    @Test
    @Transactional
    public void getAllSuiviModulesBySemestreIsInShouldWork() throws Exception {
        // Initialize the database
        suiviModuleRepository.saveAndFlush(suiviModule);

        // Get all the suiviModuleList where semestre in DEFAULT_SEMESTRE or UPDATED_SEMESTRE
        defaultSuiviModuleShouldBeFound("semestre.in=" + DEFAULT_SEMESTRE + "," + UPDATED_SEMESTRE);

        // Get all the suiviModuleList where semestre equals to UPDATED_SEMESTRE
        defaultSuiviModuleShouldNotBeFound("semestre.in=" + UPDATED_SEMESTRE);
    }

    @Test
    @Transactional
    public void getAllSuiviModulesBySemestreIsNullOrNotNull() throws Exception {
        // Initialize the database
        suiviModuleRepository.saveAndFlush(suiviModule);

        // Get all the suiviModuleList where semestre is not null
        defaultSuiviModuleShouldBeFound("semestre.specified=true");

        // Get all the suiviModuleList where semestre is null
        defaultSuiviModuleShouldNotBeFound("semestre.specified=false");
    }

    @Test
    @Transactional
    public void getAllSuiviModulesByDateIsEqualToSomething() throws Exception {
        // Initialize the database
        suiviModuleRepository.saveAndFlush(suiviModule);

        // Get all the suiviModuleList where date equals to DEFAULT_DATE
        defaultSuiviModuleShouldBeFound("date.equals=" + DEFAULT_DATE);

        // Get all the suiviModuleList where date equals to UPDATED_DATE
        defaultSuiviModuleShouldNotBeFound("date.equals=" + UPDATED_DATE);
    }

    @Test
    @Transactional
    public void getAllSuiviModulesByDateIsInShouldWork() throws Exception {
        // Initialize the database
        suiviModuleRepository.saveAndFlush(suiviModule);

        // Get all the suiviModuleList where date in DEFAULT_DATE or UPDATED_DATE
        defaultSuiviModuleShouldBeFound("date.in=" + DEFAULT_DATE + "," + UPDATED_DATE);

        // Get all the suiviModuleList where date equals to UPDATED_DATE
        defaultSuiviModuleShouldNotBeFound("date.in=" + UPDATED_DATE);
    }

    @Test
    @Transactional
    public void getAllSuiviModulesByDateIsNullOrNotNull() throws Exception {
        // Initialize the database
        suiviModuleRepository.saveAndFlush(suiviModule);

        // Get all the suiviModuleList where date is not null
        defaultSuiviModuleShouldBeFound("date.specified=true");

        // Get all the suiviModuleList where date is null
        defaultSuiviModuleShouldNotBeFound("date.specified=false");
    }

    @Test
    @Transactional
    public void getAllSuiviModulesByDebutCreneauIsEqualToSomething() throws Exception {
        // Initialize the database
        suiviModuleRepository.saveAndFlush(suiviModule);

        // Get all the suiviModuleList where debutCreneau equals to DEFAULT_DEBUT_CRENEAU
        defaultSuiviModuleShouldBeFound("debutCreneau.equals=" + DEFAULT_DEBUT_CRENEAU);

        // Get all the suiviModuleList where debutCreneau equals to UPDATED_DEBUT_CRENEAU
        defaultSuiviModuleShouldNotBeFound("debutCreneau.equals=" + UPDATED_DEBUT_CRENEAU);
    }

    @Test
    @Transactional
    public void getAllSuiviModulesByDebutCreneauIsInShouldWork() throws Exception {
        // Initialize the database
        suiviModuleRepository.saveAndFlush(suiviModule);

        // Get all the suiviModuleList where debutCreneau in DEFAULT_DEBUT_CRENEAU or UPDATED_DEBUT_CRENEAU
        defaultSuiviModuleShouldBeFound("debutCreneau.in=" + DEFAULT_DEBUT_CRENEAU + "," + UPDATED_DEBUT_CRENEAU);

        // Get all the suiviModuleList where debutCreneau equals to UPDATED_DEBUT_CRENEAU
        defaultSuiviModuleShouldNotBeFound("debutCreneau.in=" + UPDATED_DEBUT_CRENEAU);
    }

    @Test
    @Transactional
    public void getAllSuiviModulesByDebutCreneauIsNullOrNotNull() throws Exception {
        // Initialize the database
        suiviModuleRepository.saveAndFlush(suiviModule);

        // Get all the suiviModuleList where debutCreneau is not null
        defaultSuiviModuleShouldBeFound("debutCreneau.specified=true");

        // Get all the suiviModuleList where debutCreneau is null
        defaultSuiviModuleShouldNotBeFound("debutCreneau.specified=false");
    }

    @Test
    @Transactional
    public void getAllSuiviModulesByFinCreneauIsEqualToSomething() throws Exception {
        // Initialize the database
        suiviModuleRepository.saveAndFlush(suiviModule);

        // Get all the suiviModuleList where finCreneau equals to DEFAULT_FIN_CRENEAU
        defaultSuiviModuleShouldBeFound("finCreneau.equals=" + DEFAULT_FIN_CRENEAU);

        // Get all the suiviModuleList where finCreneau equals to UPDATED_FIN_CRENEAU
        defaultSuiviModuleShouldNotBeFound("finCreneau.equals=" + UPDATED_FIN_CRENEAU);
    }

    @Test
    @Transactional
    public void getAllSuiviModulesByFinCreneauIsInShouldWork() throws Exception {
        // Initialize the database
        suiviModuleRepository.saveAndFlush(suiviModule);

        // Get all the suiviModuleList where finCreneau in DEFAULT_FIN_CRENEAU or UPDATED_FIN_CRENEAU
        defaultSuiviModuleShouldBeFound("finCreneau.in=" + DEFAULT_FIN_CRENEAU + "," + UPDATED_FIN_CRENEAU);

        // Get all the suiviModuleList where finCreneau equals to UPDATED_FIN_CRENEAU
        defaultSuiviModuleShouldNotBeFound("finCreneau.in=" + UPDATED_FIN_CRENEAU);
    }

    @Test
    @Transactional
    public void getAllSuiviModulesByFinCreneauIsNullOrNotNull() throws Exception {
        // Initialize the database
        suiviModuleRepository.saveAndFlush(suiviModule);

        // Get all the suiviModuleList where finCreneau is not null
        defaultSuiviModuleShouldBeFound("finCreneau.specified=true");

        // Get all the suiviModuleList where finCreneau is null
        defaultSuiviModuleShouldNotBeFound("finCreneau.specified=false");
    }

    @Test
    @Transactional
    public void getAllSuiviModulesByDureeIsEqualToSomething() throws Exception {
        // Initialize the database
        suiviModuleRepository.saveAndFlush(suiviModule);

        // Get all the suiviModuleList where duree equals to DEFAULT_DUREE
        defaultSuiviModuleShouldBeFound("duree.equals=" + DEFAULT_DUREE);

        // Get all the suiviModuleList where duree equals to UPDATED_DUREE
        defaultSuiviModuleShouldNotBeFound("duree.equals=" + UPDATED_DUREE);
    }

    @Test
    @Transactional
    public void getAllSuiviModulesByDureeIsInShouldWork() throws Exception {
        // Initialize the database
        suiviModuleRepository.saveAndFlush(suiviModule);

        // Get all the suiviModuleList where duree in DEFAULT_DUREE or UPDATED_DUREE
        defaultSuiviModuleShouldBeFound("duree.in=" + DEFAULT_DUREE + "," + UPDATED_DUREE);

        // Get all the suiviModuleList where duree equals to UPDATED_DUREE
        defaultSuiviModuleShouldNotBeFound("duree.in=" + UPDATED_DUREE);
    }

    @Test
    @Transactional
    public void getAllSuiviModulesByDureeIsNullOrNotNull() throws Exception {
        // Initialize the database
        suiviModuleRepository.saveAndFlush(suiviModule);

        // Get all the suiviModuleList where duree is not null
        defaultSuiviModuleShouldBeFound("duree.specified=true");

        // Get all the suiviModuleList where duree is null
        defaultSuiviModuleShouldNotBeFound("duree.specified=false");
    }

    @Test
    @Transactional
    public void getAllSuiviModulesByDureeIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        suiviModuleRepository.saveAndFlush(suiviModule);

        // Get all the suiviModuleList where duree greater than or equals to DEFAULT_DUREE
        defaultSuiviModuleShouldBeFound("duree.greaterOrEqualThan=" + DEFAULT_DUREE);

        // Get all the suiviModuleList where duree greater than or equals to UPDATED_DUREE
        defaultSuiviModuleShouldNotBeFound("duree.greaterOrEqualThan=" + UPDATED_DUREE);
    }

    @Test
    @Transactional
    public void getAllSuiviModulesByDureeIsLessThanSomething() throws Exception {
        // Initialize the database
        suiviModuleRepository.saveAndFlush(suiviModule);

        // Get all the suiviModuleList where duree less than or equals to DEFAULT_DUREE
        defaultSuiviModuleShouldNotBeFound("duree.lessThan=" + DEFAULT_DUREE);

        // Get all the suiviModuleList where duree less than or equals to UPDATED_DUREE
        defaultSuiviModuleShouldBeFound("duree.lessThan=" + UPDATED_DUREE);
    }


    @Test
    @Transactional
    public void getAllSuiviModulesByUserIsEqualToSomething() throws Exception {
        // Initialize the database
        User user = UserResourceIT.createEntity(em);
        em.persist(user);
        em.flush();
        suiviModule.setUser(user);
        suiviModuleRepository.saveAndFlush(suiviModule);
        Long userId = user.getId();

        // Get all the suiviModuleList where user equals to userId
        defaultSuiviModuleShouldBeFound("userId.equals=" + userId);

        // Get all the suiviModuleList where user equals to userId + 1
        defaultSuiviModuleShouldNotBeFound("userId.equals=" + (userId + 1));
    }


    @Test
    @Transactional
    public void getAllSuiviModulesByModuleIsEqualToSomething() throws Exception {
        // Initialize the database
        Module module = ModuleResourceIT.createEntity(em);
        em.persist(module);
        em.flush();
        suiviModule.setModule(module);
        suiviModuleRepository.saveAndFlush(suiviModule);
        Long moduleId = module.getId();

        // Get all the suiviModuleList where module equals to moduleId
        defaultSuiviModuleShouldBeFound("moduleId.equals=" + moduleId);

        // Get all the suiviModuleList where module equals to moduleId + 1
        defaultSuiviModuleShouldNotBeFound("moduleId.equals=" + (moduleId + 1));
    }

    /**
     * Executes the search, and checks that the default entity is returned.
     */
    private void defaultSuiviModuleShouldBeFound(String filter) throws Exception {
        restSuiviModuleMockMvc.perform(get("/api/suivi-modules?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(suiviModule.getId().intValue())))
            .andExpect(jsonPath("$.[*].semestre").value(hasItem(DEFAULT_SEMESTRE.toString())))
            .andExpect(jsonPath("$.[*].descriptif").value(hasItem(DEFAULT_DESCRIPTIF.toString())))
            .andExpect(jsonPath("$.[*].observations").value(hasItem(DEFAULT_OBSERVATIONS.toString())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].debutCreneau").value(hasItem(DEFAULT_DEBUT_CRENEAU.toString())))
            .andExpect(jsonPath("$.[*].finCreneau").value(hasItem(DEFAULT_FIN_CRENEAU.toString())))
            .andExpect(jsonPath("$.[*].duree").value(hasItem(DEFAULT_DUREE)));

        // Check, that the count call also returns 1
        restSuiviModuleMockMvc.perform(get("/api/suivi-modules/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(content().string("1"));
    }

    /**
     * Executes the search, and checks that the default entity is not returned.
     */
    private void defaultSuiviModuleShouldNotBeFound(String filter) throws Exception {
        restSuiviModuleMockMvc.perform(get("/api/suivi-modules?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());

        // Check, that the count call also returns 0
        restSuiviModuleMockMvc.perform(get("/api/suivi-modules/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(content().string("0"));
    }


    @Test
    @Transactional
    public void getNonExistingSuiviModule() throws Exception {
        // Get the suiviModule
        restSuiviModuleMockMvc.perform(get("/api/suivi-modules/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSuiviModule() throws Exception {
        // Initialize the database
    	suiviModuleRepository.save(suiviModule);

        int databaseSizeBeforeUpdate = suiviModuleRepository.findAll().size();

        // Update the suiviModule
        SuiviModule updatedSuiviModule = suiviModuleRepository.findById(suiviModule.getId()).get();
        // Disconnect from session so that the updates on updatedSuiviModule are not directly saved in db
        em.detach(updatedSuiviModule);
        updatedSuiviModule
            .semestre(UPDATED_SEMESTRE)
            .descriptif(UPDATED_DESCRIPTIF)
            .observations(UPDATED_OBSERVATIONS)
            .date(UPDATED_DATE)
            .debutCreneau(UPDATED_DEBUT_CRENEAU)
            .finCreneau(UPDATED_FIN_CRENEAU)
            .duree(UPDATED_DUREE);

        restSuiviModuleMockMvc.perform(put("/api/suivi-modules")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSuiviModule)))
            .andExpect(status().isOk());

        // Validate the SuiviModule in the database
        List<SuiviModule> suiviModuleList = suiviModuleRepository.findAll();
        assertThat(suiviModuleList).hasSize(databaseSizeBeforeUpdate);
        SuiviModule testSuiviModule = suiviModuleList.get(suiviModuleList.size() - 1);
        assertThat(testSuiviModule.getSemestre()).isEqualTo(UPDATED_SEMESTRE);
        assertThat(testSuiviModule.getDescriptif()).isEqualTo(UPDATED_DESCRIPTIF);
        assertThat(testSuiviModule.getObservations()).isEqualTo(UPDATED_OBSERVATIONS);
        assertThat(testSuiviModule.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testSuiviModule.getDebutCreneau()).isEqualTo(UPDATED_DEBUT_CRENEAU);
        assertThat(testSuiviModule.getFinCreneau()).isEqualTo(UPDATED_FIN_CRENEAU);
        assertThat(testSuiviModule.getDuree()).isEqualTo(UPDATED_DUREE);
    }

    @Test
    @Transactional
    public void updateNonExistingSuiviModule() throws Exception {
        int databaseSizeBeforeUpdate = suiviModuleRepository.findAll().size();

        // Create the SuiviModule

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSuiviModuleMockMvc.perform(put("/api/suivi-modules")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(suiviModule)))
            .andExpect(status().isBadRequest());

        // Validate the SuiviModule in the database
        List<SuiviModule> suiviModuleList = suiviModuleRepository.findAll();
        assertThat(suiviModuleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSuiviModule() throws Exception {
        // Initialize the database
    	suiviModuleRepository.save(suiviModule);

        int databaseSizeBeforeDelete = suiviModuleRepository.findAll().size();

        // Delete the suiviModule
        restSuiviModuleMockMvc.perform(delete("/api/suivi-modules/{id}", suiviModule.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<SuiviModule> suiviModuleList = suiviModuleRepository.findAll();
        assertThat(suiviModuleList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SuiviModule.class);
        SuiviModule suiviModule1 = new SuiviModule();
        suiviModule1.setId(1L);
        SuiviModule suiviModule2 = new SuiviModule();
        suiviModule2.setId(suiviModule1.getId());
        assertThat(suiviModule1).isEqualTo(suiviModule2);
        suiviModule2.setId(2L);
        assertThat(suiviModule1).isNotEqualTo(suiviModule2);
        suiviModule1.setId(null);
        assertThat(suiviModule1).isNotEqualTo(suiviModule2);
    }
}
