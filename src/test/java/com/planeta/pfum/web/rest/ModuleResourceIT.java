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
import com.planeta.pfum.domain.Absence;
import com.planeta.pfum.domain.AffectationModule;
import com.planeta.pfum.domain.CalendrierModule;
import com.planeta.pfum.domain.Filiere;
import com.planeta.pfum.domain.Module;
import com.planeta.pfum.domain.NoteExecutif;
import com.planeta.pfum.domain.NoteLicence;
import com.planeta.pfum.domain.NoteMaster;
import com.planeta.pfum.domain.SuiviModule;
import com.planeta.pfum.domain.enumeration.Semestre;
import com.planeta.pfum.repository.ModuleRepository;
import com.planeta.pfum.web.rest.errors.ExceptionTranslator;
/**
 * Integration tests for the {@Link ModuleResource} REST controller.
 */
@SpringBootTest(classes = PfumApp.class)
public class ModuleResourceIT {

    private static final String DEFAULT_NOM_MODULE = "AAAAAAAAAA";
    private static final String UPDATED_NOM_MODULE = "BBBBBBBBBB";

    private static final Integer DEFAULT_VOLUME_HORAIRE = 1;
    private static final Integer UPDATED_VOLUME_HORAIRE = 2;

    private static final Semestre DEFAULT_SEMESTRE = Semestre.S1;
    private static final Semestre UPDATED_SEMESTRE = Semestre.S2;

    @Autowired
    private ModuleRepository moduleRepository;


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

    private MockMvc restModuleMockMvc;

    private Module module;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ModuleResource moduleResource = new ModuleResource(moduleRepository);
        this.restModuleMockMvc = MockMvcBuilders.standaloneSetup(moduleResource)
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
    public static Module createEntity(EntityManager em) {
        Module module = new Module()
            .nomModule(DEFAULT_NOM_MODULE)
            .volumeHoraire(DEFAULT_VOLUME_HORAIRE)
            .semestre(DEFAULT_SEMESTRE);
        return module;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Module createUpdatedEntity(EntityManager em) {
        Module module = new Module()
            .nomModule(UPDATED_NOM_MODULE)
            .volumeHoraire(UPDATED_VOLUME_HORAIRE)
            .semestre(UPDATED_SEMESTRE);
        return module;
    }

    @BeforeEach
    public void initTest() {
        module = createEntity(em);
    }

    @Test
    @Transactional
    public void createModule() throws Exception {
        int databaseSizeBeforeCreate = moduleRepository.findAll().size();

        // Create the Module
        restModuleMockMvc.perform(post("/api/modules")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(module)))
            .andExpect(status().isCreated());

        // Validate the Module in the database
        List<Module> moduleList = moduleRepository.findAll();
        assertThat(moduleList).hasSize(databaseSizeBeforeCreate + 1);
        Module testModule = moduleList.get(moduleList.size() - 1);
        assertThat(testModule.getNomModule()).isEqualTo(DEFAULT_NOM_MODULE);
        assertThat(testModule.getVolumeHoraire()).isEqualTo(DEFAULT_VOLUME_HORAIRE);
        assertThat(testModule.getSemestre()).isEqualTo(DEFAULT_SEMESTRE);
    }

    @Test
    @Transactional
    public void createModuleWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = moduleRepository.findAll().size();

        // Create the Module with an existing ID
        module.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restModuleMockMvc.perform(post("/api/modules")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(module)))
            .andExpect(status().isBadRequest());

        // Validate the Module in the database
        List<Module> moduleList = moduleRepository.findAll();
        assertThat(moduleList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllModules() throws Exception {
        // Initialize the database
        moduleRepository.saveAndFlush(module);

        // Get all the moduleList
        restModuleMockMvc.perform(get("/api/modules?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(module.getId().intValue())))
            .andExpect(jsonPath("$.[*].nomModule").value(hasItem(DEFAULT_NOM_MODULE.toString())))
            .andExpect(jsonPath("$.[*].volumeHoraire").value(hasItem(DEFAULT_VOLUME_HORAIRE)))
            .andExpect(jsonPath("$.[*].semestre").value(hasItem(DEFAULT_SEMESTRE.toString())));
    }
    
    @Test
    @Transactional
    public void getModule() throws Exception {
        // Initialize the database
        moduleRepository.saveAndFlush(module);

        // Get the module
        restModuleMockMvc.perform(get("/api/modules/{id}", module.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(module.getId().intValue()))
            .andExpect(jsonPath("$.nomModule").value(DEFAULT_NOM_MODULE.toString()))
            .andExpect(jsonPath("$.volumeHoraire").value(DEFAULT_VOLUME_HORAIRE))
            .andExpect(jsonPath("$.semestre").value(DEFAULT_SEMESTRE.toString()));
    }

    @Test
    @Transactional
    public void getAllModulesByNomModuleIsEqualToSomething() throws Exception {
        // Initialize the database
        moduleRepository.saveAndFlush(module);

        // Get all the moduleList where nomModule equals to DEFAULT_NOM_MODULE
        defaultModuleShouldBeFound("nomModule.equals=" + DEFAULT_NOM_MODULE);

        // Get all the moduleList where nomModule equals to UPDATED_NOM_MODULE
        defaultModuleShouldNotBeFound("nomModule.equals=" + UPDATED_NOM_MODULE);
    }

    @Test
    @Transactional
    public void getAllModulesByNomModuleIsInShouldWork() throws Exception {
        // Initialize the database
        moduleRepository.saveAndFlush(module);

        // Get all the moduleList where nomModule in DEFAULT_NOM_MODULE or UPDATED_NOM_MODULE
        defaultModuleShouldBeFound("nomModule.in=" + DEFAULT_NOM_MODULE + "," + UPDATED_NOM_MODULE);

        // Get all the moduleList where nomModule equals to UPDATED_NOM_MODULE
        defaultModuleShouldNotBeFound("nomModule.in=" + UPDATED_NOM_MODULE);
    }

    @Test
    @Transactional
    public void getAllModulesByNomModuleIsNullOrNotNull() throws Exception {
        // Initialize the database
        moduleRepository.saveAndFlush(module);

        // Get all the moduleList where nomModule is not null
        defaultModuleShouldBeFound("nomModule.specified=true");

        // Get all the moduleList where nomModule is null
        defaultModuleShouldNotBeFound("nomModule.specified=false");
    }

    @Test
    @Transactional
    public void getAllModulesByVolumeHoraireIsEqualToSomething() throws Exception {
        // Initialize the database
        moduleRepository.saveAndFlush(module);

        // Get all the moduleList where volumeHoraire equals to DEFAULT_VOLUME_HORAIRE
        defaultModuleShouldBeFound("volumeHoraire.equals=" + DEFAULT_VOLUME_HORAIRE);

        // Get all the moduleList where volumeHoraire equals to UPDATED_VOLUME_HORAIRE
        defaultModuleShouldNotBeFound("volumeHoraire.equals=" + UPDATED_VOLUME_HORAIRE);
    }

    @Test
    @Transactional
    public void getAllModulesByVolumeHoraireIsInShouldWork() throws Exception {
        // Initialize the database
        moduleRepository.saveAndFlush(module);

        // Get all the moduleList where volumeHoraire in DEFAULT_VOLUME_HORAIRE or UPDATED_VOLUME_HORAIRE
        defaultModuleShouldBeFound("volumeHoraire.in=" + DEFAULT_VOLUME_HORAIRE + "," + UPDATED_VOLUME_HORAIRE);

        // Get all the moduleList where volumeHoraire equals to UPDATED_VOLUME_HORAIRE
        defaultModuleShouldNotBeFound("volumeHoraire.in=" + UPDATED_VOLUME_HORAIRE);
    }

    @Test
    @Transactional
    public void getAllModulesByVolumeHoraireIsNullOrNotNull() throws Exception {
        // Initialize the database
        moduleRepository.saveAndFlush(module);

        // Get all the moduleList where volumeHoraire is not null
        defaultModuleShouldBeFound("volumeHoraire.specified=true");

        // Get all the moduleList where volumeHoraire is null
        defaultModuleShouldNotBeFound("volumeHoraire.specified=false");
    }

    @Test
    @Transactional
    public void getAllModulesByVolumeHoraireIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        moduleRepository.saveAndFlush(module);

        // Get all the moduleList where volumeHoraire greater than or equals to DEFAULT_VOLUME_HORAIRE
        defaultModuleShouldBeFound("volumeHoraire.greaterOrEqualThan=" + DEFAULT_VOLUME_HORAIRE);

        // Get all the moduleList where volumeHoraire greater than or equals to UPDATED_VOLUME_HORAIRE
        defaultModuleShouldNotBeFound("volumeHoraire.greaterOrEqualThan=" + UPDATED_VOLUME_HORAIRE);
    }

    @Test
    @Transactional
    public void getAllModulesByVolumeHoraireIsLessThanSomething() throws Exception {
        // Initialize the database
        moduleRepository.saveAndFlush(module);

        // Get all the moduleList where volumeHoraire less than or equals to DEFAULT_VOLUME_HORAIRE
        defaultModuleShouldNotBeFound("volumeHoraire.lessThan=" + DEFAULT_VOLUME_HORAIRE);

        // Get all the moduleList where volumeHoraire less than or equals to UPDATED_VOLUME_HORAIRE
        defaultModuleShouldBeFound("volumeHoraire.lessThan=" + UPDATED_VOLUME_HORAIRE);
    }


    @Test
    @Transactional
    public void getAllModulesBySemestreIsEqualToSomething() throws Exception {
        // Initialize the database
        moduleRepository.saveAndFlush(module);

        // Get all the moduleList where semestre equals to DEFAULT_SEMESTRE
        defaultModuleShouldBeFound("semestre.equals=" + DEFAULT_SEMESTRE);

        // Get all the moduleList where semestre equals to UPDATED_SEMESTRE
        defaultModuleShouldNotBeFound("semestre.equals=" + UPDATED_SEMESTRE);
    }

    @Test
    @Transactional
    public void getAllModulesBySemestreIsInShouldWork() throws Exception {
        // Initialize the database
        moduleRepository.saveAndFlush(module);

        // Get all the moduleList where semestre in DEFAULT_SEMESTRE or UPDATED_SEMESTRE
        defaultModuleShouldBeFound("semestre.in=" + DEFAULT_SEMESTRE + "," + UPDATED_SEMESTRE);

        // Get all the moduleList where semestre equals to UPDATED_SEMESTRE
        defaultModuleShouldNotBeFound("semestre.in=" + UPDATED_SEMESTRE);
    }

    @Test
    @Transactional
    public void getAllModulesBySemestreIsNullOrNotNull() throws Exception {
        // Initialize the database
        moduleRepository.saveAndFlush(module);

        // Get all the moduleList where semestre is not null
        defaultModuleShouldBeFound("semestre.specified=true");

        // Get all the moduleList where semestre is null
        defaultModuleShouldNotBeFound("semestre.specified=false");
    }

    @Test
    @Transactional
    public void getAllModulesByAbsenceIsEqualToSomething() throws Exception {
        // Initialize the database
        Absence absence = AbsenceResourceIT.createEntity(em);
        em.persist(absence);
        em.flush();
        module.addAbsence(absence);
        moduleRepository.saveAndFlush(module);
        Long absenceId = absence.getId();

        // Get all the moduleList where absence equals to absenceId
        defaultModuleShouldBeFound("absenceId.equals=" + absenceId);

        // Get all the moduleList where absence equals to absenceId + 1
        defaultModuleShouldNotBeFound("absenceId.equals=" + (absenceId + 1));
    }


    @Test
    @Transactional
    public void getAllModulesByAffectationModuleIsEqualToSomething() throws Exception {
        // Initialize the database
        AffectationModule affectationModule = AffectationModuleResourceIT.createEntity(em);
        em.persist(affectationModule);
        em.flush();
        module.addAffectationModule(affectationModule);
        moduleRepository.saveAndFlush(module);
        Long affectationModuleId = affectationModule.getId();

        // Get all the moduleList where affectationModule equals to affectationModuleId
        defaultModuleShouldBeFound("affectationModuleId.equals=" + affectationModuleId);

        // Get all the moduleList where affectationModule equals to affectationModuleId + 1
        defaultModuleShouldNotBeFound("affectationModuleId.equals=" + (affectationModuleId + 1));
    }


    @Test
    @Transactional
    public void getAllModulesByCalendrierModuleIsEqualToSomething() throws Exception {
        // Initialize the database
        CalendrierModule calendrierModule = CalendrierModuleResourceIT.createEntity(em);
        em.persist(calendrierModule);
        em.flush();
        module.addCalendrierModule(calendrierModule);
        moduleRepository.saveAndFlush(module);
        Long calendrierModuleId = calendrierModule.getId();

        // Get all the moduleList where calendrierModule equals to calendrierModuleId
        defaultModuleShouldBeFound("calendrierModuleId.equals=" + calendrierModuleId);

        // Get all the moduleList where calendrierModule equals to calendrierModuleId + 1
        defaultModuleShouldNotBeFound("calendrierModuleId.equals=" + (calendrierModuleId + 1));
    }


    @Test
    @Transactional
    public void getAllModulesBySuiviModuleIsEqualToSomething() throws Exception {
        // Initialize the database
        SuiviModule suiviModule = SuiviModuleResourceIT.createEntity(em);
        em.persist(suiviModule);
        em.flush();
        module.addSuiviModule(suiviModule);
        moduleRepository.saveAndFlush(module);
        Long suiviModuleId = suiviModule.getId();

        // Get all the moduleList where suiviModule equals to suiviModuleId
        defaultModuleShouldBeFound("suiviModuleId.equals=" + suiviModuleId);

        // Get all the moduleList where suiviModule equals to suiviModuleId + 1
        defaultModuleShouldNotBeFound("suiviModuleId.equals=" + (suiviModuleId + 1));
    }


    @Test
    @Transactional
    public void getAllModulesByNoteLicenceIsEqualToSomething() throws Exception {
        // Initialize the database
        NoteLicence noteLicence = NoteLicenceResourceIT.createEntity(em);
        em.persist(noteLicence);
        em.flush();
        module.addNoteLicence(noteLicence);
        moduleRepository.saveAndFlush(module);
        Long noteLicenceId = noteLicence.getId();

        // Get all the moduleList where noteLicence equals to noteLicenceId
        defaultModuleShouldBeFound("noteLicenceId.equals=" + noteLicenceId);

        // Get all the moduleList where noteLicence equals to noteLicenceId + 1
        defaultModuleShouldNotBeFound("noteLicenceId.equals=" + (noteLicenceId + 1));
    }


    @Test
    @Transactional
    public void getAllModulesByNoteMasterIsEqualToSomething() throws Exception {
        // Initialize the database
        NoteMaster noteMaster = NoteMasterResourceIT.createEntity(em);
        em.persist(noteMaster);
        em.flush();
        module.addNoteMaster(noteMaster);
        moduleRepository.saveAndFlush(module);
        Long noteMasterId = noteMaster.getId();

        // Get all the moduleList where noteMaster equals to noteMasterId
        defaultModuleShouldBeFound("noteMasterId.equals=" + noteMasterId);

        // Get all the moduleList where noteMaster equals to noteMasterId + 1
        defaultModuleShouldNotBeFound("noteMasterId.equals=" + (noteMasterId + 1));
    }


    @Test
    @Transactional
    public void getAllModulesByNoteExecutifIsEqualToSomething() throws Exception {
        // Initialize the database
        NoteExecutif noteExecutif = NoteExecutifResourceIT.createEntity(em);
        em.persist(noteExecutif);
        em.flush();
        module.addNoteExecutif(noteExecutif);
        moduleRepository.saveAndFlush(module);
        Long noteExecutifId = noteExecutif.getId();

        // Get all the moduleList where noteExecutif equals to noteExecutifId
        defaultModuleShouldBeFound("noteExecutifId.equals=" + noteExecutifId);

        // Get all the moduleList where noteExecutif equals to noteExecutifId + 1
        defaultModuleShouldNotBeFound("noteExecutifId.equals=" + (noteExecutifId + 1));
    }


    @Test
    @Transactional
    public void getAllModulesByFiliereIsEqualToSomething() throws Exception {
        // Initialize the database
        Filiere filiere = FiliereResourceIT.createEntity(em);
        em.persist(filiere);
        em.flush();
        module.setFiliere(filiere);
        moduleRepository.saveAndFlush(module);
        Long filiereId = filiere.getId();

        // Get all the moduleList where filiere equals to filiereId
        defaultModuleShouldBeFound("filiereId.equals=" + filiereId);

        // Get all the moduleList where filiere equals to filiereId + 1
        defaultModuleShouldNotBeFound("filiereId.equals=" + (filiereId + 1));
    }

    /**
     * Executes the search, and checks that the default entity is returned.
     */
    private void defaultModuleShouldBeFound(String filter) throws Exception {
        restModuleMockMvc.perform(get("/api/modules?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(module.getId().intValue())))
            .andExpect(jsonPath("$.[*].nomModule").value(hasItem(DEFAULT_NOM_MODULE)))
            .andExpect(jsonPath("$.[*].volumeHoraire").value(hasItem(DEFAULT_VOLUME_HORAIRE)))
            .andExpect(jsonPath("$.[*].semestre").value(hasItem(DEFAULT_SEMESTRE.toString())));

        // Check, that the count call also returns 1
        restModuleMockMvc.perform(get("/api/modules/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(content().string("1"));
    }

    /**
     * Executes the search, and checks that the default entity is not returned.
     */
    private void defaultModuleShouldNotBeFound(String filter) throws Exception {
        restModuleMockMvc.perform(get("/api/modules?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());

        // Check, that the count call also returns 0
        restModuleMockMvc.perform(get("/api/modules/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(content().string("0"));
    }


    @Test
    @Transactional
    public void getNonExistingModule() throws Exception {
        // Get the module
        restModuleMockMvc.perform(get("/api/modules/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateModule() throws Exception {
        // Initialize the database
    	moduleRepository.save(module);

        int databaseSizeBeforeUpdate = moduleRepository.findAll().size();

        // Update the module
        Module updatedModule = moduleRepository.findById(module.getId()).get();
        // Disconnect from session so that the updates on updatedModule are not directly saved in db
        em.detach(updatedModule);
        updatedModule
            .nomModule(UPDATED_NOM_MODULE)
            .volumeHoraire(UPDATED_VOLUME_HORAIRE)
            .semestre(UPDATED_SEMESTRE);

        restModuleMockMvc.perform(put("/api/modules")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedModule)))
            .andExpect(status().isOk());

        // Validate the Module in the database
        List<Module> moduleList = moduleRepository.findAll();
        assertThat(moduleList).hasSize(databaseSizeBeforeUpdate);
        Module testModule = moduleList.get(moduleList.size() - 1);
        assertThat(testModule.getNomModule()).isEqualTo(UPDATED_NOM_MODULE);
        assertThat(testModule.getVolumeHoraire()).isEqualTo(UPDATED_VOLUME_HORAIRE);
        assertThat(testModule.getSemestre()).isEqualTo(UPDATED_SEMESTRE);
    }

    @Test
    @Transactional
    public void updateNonExistingModule() throws Exception {
        int databaseSizeBeforeUpdate = moduleRepository.findAll().size();

        // Create the Module

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restModuleMockMvc.perform(put("/api/modules")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(module)))
            .andExpect(status().isBadRequest());

        // Validate the Module in the database
        List<Module> moduleList = moduleRepository.findAll();
        assertThat(moduleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteModule() throws Exception {
        // Initialize the database
    	moduleRepository.save(module);

        int databaseSizeBeforeDelete = moduleRepository.findAll().size();

        // Delete the module
        restModuleMockMvc.perform(delete("/api/modules/{id}", module.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Module> moduleList = moduleRepository.findAll();
        assertThat(moduleList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Module.class);
        Module module1 = new Module();
        module1.setId(1L);
        Module module2 = new Module();
        module2.setId(module1.getId());
        assertThat(module1).isEqualTo(module2);
        module2.setId(2L);
        assertThat(module1).isNotEqualTo(module2);
        module1.setId(null);
        assertThat(module1).isNotEqualTo(module2);
    }
}
