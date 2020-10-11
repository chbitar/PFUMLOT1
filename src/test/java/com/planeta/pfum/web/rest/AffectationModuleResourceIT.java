package com.planeta.pfum.web.rest;

import com.planeta.pfum.Pfumv10App;
import com.planeta.pfum.domain.AffectationModule;
import com.planeta.pfum.repository.AffectationModuleRepository;
import com.planeta.pfum.repository.search.AffectationModuleSearchRepository;
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
 * Integration tests for the {@Link AffectationModuleResource} REST controller.
 */
@SpringBootTest(classes = Pfumv10App.class)
public class AffectationModuleResourceIT {

    private static final String DEFAULT_ANNEE = "AAAAAAAAAA";
    private static final String UPDATED_ANNEE = "BBBBBBBBBB";

    private static final Semestre DEFAULT_SEMESTRE = Semestre.S1;
    private static final Semestre UPDATED_SEMESTRE = Semestre.S2;

    @Autowired
    private AffectationModuleRepository affectationModuleRepository;

    /**
     * This repository is mocked in the com.planeta.pfum.repository.search test package.
     *
     * @see com.planeta.pfum.repository.search.AffectationModuleSearchRepositoryMockConfiguration
     */
    @Autowired
    private AffectationModuleSearchRepository mockAffectationModuleSearchRepository;

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

    private MockMvc restAffectationModuleMockMvc;

    private AffectationModule affectationModule;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AffectationModuleResource affectationModuleResource = new AffectationModuleResource(affectationModuleRepository, mockAffectationModuleSearchRepository);
        this.restAffectationModuleMockMvc = MockMvcBuilders.standaloneSetup(affectationModuleResource)
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
    public static AffectationModule createEntity(EntityManager em) {
        AffectationModule affectationModule = new AffectationModule()
            .annee(DEFAULT_ANNEE)
            .semestre(DEFAULT_SEMESTRE);
        return affectationModule;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AffectationModule createUpdatedEntity(EntityManager em) {
        AffectationModule affectationModule = new AffectationModule()
            .annee(UPDATED_ANNEE)
            .semestre(UPDATED_SEMESTRE);
        return affectationModule;
    }

    @BeforeEach
    public void initTest() {
        affectationModule = createEntity(em);
    }

    @Test
    @Transactional
    public void createAffectationModule() throws Exception {
        int databaseSizeBeforeCreate = affectationModuleRepository.findAll().size();

        // Create the AffectationModule
        restAffectationModuleMockMvc.perform(post("/api/affectation-modules")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(affectationModule)))
            .andExpect(status().isCreated());

        // Validate the AffectationModule in the database
        List<AffectationModule> affectationModuleList = affectationModuleRepository.findAll();
        assertThat(affectationModuleList).hasSize(databaseSizeBeforeCreate + 1);
        AffectationModule testAffectationModule = affectationModuleList.get(affectationModuleList.size() - 1);
        assertThat(testAffectationModule.getAnnee()).isEqualTo(DEFAULT_ANNEE);
        assertThat(testAffectationModule.getSemestre()).isEqualTo(DEFAULT_SEMESTRE);

        // Validate the AffectationModule in Elasticsearch
        verify(mockAffectationModuleSearchRepository, times(1)).save(testAffectationModule);
    }

    @Test
    @Transactional
    public void createAffectationModuleWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = affectationModuleRepository.findAll().size();

        // Create the AffectationModule with an existing ID
        affectationModule.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAffectationModuleMockMvc.perform(post("/api/affectation-modules")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(affectationModule)))
            .andExpect(status().isBadRequest());

        // Validate the AffectationModule in the database
        List<AffectationModule> affectationModuleList = affectationModuleRepository.findAll();
        assertThat(affectationModuleList).hasSize(databaseSizeBeforeCreate);

        // Validate the AffectationModule in Elasticsearch
        verify(mockAffectationModuleSearchRepository, times(0)).save(affectationModule);
    }


    @Test
    @Transactional
    public void getAllAffectationModules() throws Exception {
        // Initialize the database
        affectationModuleRepository.saveAndFlush(affectationModule);

        // Get all the affectationModuleList
        restAffectationModuleMockMvc.perform(get("/api/affectation-modules?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(affectationModule.getId().intValue())))
            .andExpect(jsonPath("$.[*].annee").value(hasItem(DEFAULT_ANNEE.toString())))
            .andExpect(jsonPath("$.[*].semestre").value(hasItem(DEFAULT_SEMESTRE.toString())));
    }
    
    @Test
    @Transactional
    public void getAffectationModule() throws Exception {
        // Initialize the database
        affectationModuleRepository.saveAndFlush(affectationModule);

        // Get the affectationModule
        restAffectationModuleMockMvc.perform(get("/api/affectation-modules/{id}", affectationModule.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(affectationModule.getId().intValue()))
            .andExpect(jsonPath("$.annee").value(DEFAULT_ANNEE.toString()))
            .andExpect(jsonPath("$.semestre").value(DEFAULT_SEMESTRE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingAffectationModule() throws Exception {
        // Get the affectationModule
        restAffectationModuleMockMvc.perform(get("/api/affectation-modules/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAffectationModule() throws Exception {
        // Initialize the database
        affectationModuleRepository.saveAndFlush(affectationModule);

        int databaseSizeBeforeUpdate = affectationModuleRepository.findAll().size();

        // Update the affectationModule
        AffectationModule updatedAffectationModule = affectationModuleRepository.findById(affectationModule.getId()).get();
        // Disconnect from session so that the updates on updatedAffectationModule are not directly saved in db
        em.detach(updatedAffectationModule);
        updatedAffectationModule
            .annee(UPDATED_ANNEE)
            .semestre(UPDATED_SEMESTRE);

        restAffectationModuleMockMvc.perform(put("/api/affectation-modules")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAffectationModule)))
            .andExpect(status().isOk());

        // Validate the AffectationModule in the database
        List<AffectationModule> affectationModuleList = affectationModuleRepository.findAll();
        assertThat(affectationModuleList).hasSize(databaseSizeBeforeUpdate);
        AffectationModule testAffectationModule = affectationModuleList.get(affectationModuleList.size() - 1);
        assertThat(testAffectationModule.getAnnee()).isEqualTo(UPDATED_ANNEE);
        assertThat(testAffectationModule.getSemestre()).isEqualTo(UPDATED_SEMESTRE);

        // Validate the AffectationModule in Elasticsearch
        verify(mockAffectationModuleSearchRepository, times(1)).save(testAffectationModule);
    }

    @Test
    @Transactional
    public void updateNonExistingAffectationModule() throws Exception {
        int databaseSizeBeforeUpdate = affectationModuleRepository.findAll().size();

        // Create the AffectationModule

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAffectationModuleMockMvc.perform(put("/api/affectation-modules")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(affectationModule)))
            .andExpect(status().isBadRequest());

        // Validate the AffectationModule in the database
        List<AffectationModule> affectationModuleList = affectationModuleRepository.findAll();
        assertThat(affectationModuleList).hasSize(databaseSizeBeforeUpdate);

        // Validate the AffectationModule in Elasticsearch
        verify(mockAffectationModuleSearchRepository, times(0)).save(affectationModule);
    }

    @Test
    @Transactional
    public void deleteAffectationModule() throws Exception {
        // Initialize the database
        affectationModuleRepository.saveAndFlush(affectationModule);

        int databaseSizeBeforeDelete = affectationModuleRepository.findAll().size();

        // Delete the affectationModule
        restAffectationModuleMockMvc.perform(delete("/api/affectation-modules/{id}", affectationModule.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<AffectationModule> affectationModuleList = affectationModuleRepository.findAll();
        assertThat(affectationModuleList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the AffectationModule in Elasticsearch
        verify(mockAffectationModuleSearchRepository, times(1)).deleteById(affectationModule.getId());
    }

    @Test
    @Transactional
    public void searchAffectationModule() throws Exception {
        // Initialize the database
        affectationModuleRepository.saveAndFlush(affectationModule);
        when(mockAffectationModuleSearchRepository.search(queryStringQuery("id:" + affectationModule.getId())))
            .thenReturn(Collections.singletonList(affectationModule));
        // Search the affectationModule
        restAffectationModuleMockMvc.perform(get("/api/_search/affectation-modules?query=id:" + affectationModule.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(affectationModule.getId().intValue())))
            .andExpect(jsonPath("$.[*].annee").value(hasItem(DEFAULT_ANNEE)))
            .andExpect(jsonPath("$.[*].semestre").value(hasItem(DEFAULT_SEMESTRE.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AffectationModule.class);
        AffectationModule affectationModule1 = new AffectationModule();
        affectationModule1.setId(1L);
        AffectationModule affectationModule2 = new AffectationModule();
        affectationModule2.setId(affectationModule1.getId());
        assertThat(affectationModule1).isEqualTo(affectationModule2);
        affectationModule2.setId(2L);
        assertThat(affectationModule1).isNotEqualTo(affectationModule2);
        affectationModule1.setId(null);
        assertThat(affectationModule1).isNotEqualTo(affectationModule2);
    }
}
