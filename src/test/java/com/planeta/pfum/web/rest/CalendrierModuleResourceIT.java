package com.planeta.pfum.web.rest;

import com.planeta.pfum.Pfumv10App;
import com.planeta.pfum.domain.CalendrierModule;
import com.planeta.pfum.repository.CalendrierModuleRepository;
import com.planeta.pfum.repository.search.CalendrierModuleSearchRepository;
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
 * Integration tests for the {@Link CalendrierModuleResource} REST controller.
 */
@SpringBootTest(classes = Pfumv10App.class)
public class CalendrierModuleResourceIT {

    private static final String DEFAULT_LIBELLE = "AAAAAAAAAA";
    private static final String UPDATED_LIBELLE = "BBBBBBBBBB";

    private static final Instant DEFAULT_DATE_CONTROL_CONTINU_1 = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE_CONTROL_CONTINU_1 = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_DATE_CONTROL_CONTINU_2 = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE_CONTROL_CONTINU_2 = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private CalendrierModuleRepository calendrierModuleRepository;

    /**
     * This repository is mocked in the com.planeta.pfum.repository.search test package.
     *
     * @see com.planeta.pfum.repository.search.CalendrierModuleSearchRepositoryMockConfiguration
     */
    @Autowired
    private CalendrierModuleSearchRepository mockCalendrierModuleSearchRepository;

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

    private MockMvc restCalendrierModuleMockMvc;

    private CalendrierModule calendrierModule;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CalendrierModuleResource calendrierModuleResource = new CalendrierModuleResource(calendrierModuleRepository, mockCalendrierModuleSearchRepository);
        this.restCalendrierModuleMockMvc = MockMvcBuilders.standaloneSetup(calendrierModuleResource)
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
    public static CalendrierModule createEntity(EntityManager em) {
        CalendrierModule calendrierModule = new CalendrierModule()
            .libelle(DEFAULT_LIBELLE)
            .dateControlContinu1(DEFAULT_DATE_CONTROL_CONTINU_1)
            .dateControlContinu2(DEFAULT_DATE_CONTROL_CONTINU_2);
        return calendrierModule;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CalendrierModule createUpdatedEntity(EntityManager em) {
        CalendrierModule calendrierModule = new CalendrierModule()
            .libelle(UPDATED_LIBELLE)
            .dateControlContinu1(UPDATED_DATE_CONTROL_CONTINU_1)
            .dateControlContinu2(UPDATED_DATE_CONTROL_CONTINU_2);
        return calendrierModule;
    }

    @BeforeEach
    public void initTest() {
        calendrierModule = createEntity(em);
    }

    @Test
    @Transactional
    public void createCalendrierModule() throws Exception {
        int databaseSizeBeforeCreate = calendrierModuleRepository.findAll().size();

        // Create the CalendrierModule
        restCalendrierModuleMockMvc.perform(post("/api/calendrier-modules")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(calendrierModule)))
            .andExpect(status().isCreated());

        // Validate the CalendrierModule in the database
        List<CalendrierModule> calendrierModuleList = calendrierModuleRepository.findAll();
        assertThat(calendrierModuleList).hasSize(databaseSizeBeforeCreate + 1);
        CalendrierModule testCalendrierModule = calendrierModuleList.get(calendrierModuleList.size() - 1);
        assertThat(testCalendrierModule.getLibelle()).isEqualTo(DEFAULT_LIBELLE);
        assertThat(testCalendrierModule.getDateControlContinu1()).isEqualTo(DEFAULT_DATE_CONTROL_CONTINU_1);
        assertThat(testCalendrierModule.getDateControlContinu2()).isEqualTo(DEFAULT_DATE_CONTROL_CONTINU_2);

        // Validate the CalendrierModule in Elasticsearch
        verify(mockCalendrierModuleSearchRepository, times(1)).save(testCalendrierModule);
    }

    @Test
    @Transactional
    public void createCalendrierModuleWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = calendrierModuleRepository.findAll().size();

        // Create the CalendrierModule with an existing ID
        calendrierModule.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCalendrierModuleMockMvc.perform(post("/api/calendrier-modules")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(calendrierModule)))
            .andExpect(status().isBadRequest());

        // Validate the CalendrierModule in the database
        List<CalendrierModule> calendrierModuleList = calendrierModuleRepository.findAll();
        assertThat(calendrierModuleList).hasSize(databaseSizeBeforeCreate);

        // Validate the CalendrierModule in Elasticsearch
        verify(mockCalendrierModuleSearchRepository, times(0)).save(calendrierModule);
    }


    @Test
    @Transactional
    public void getAllCalendrierModules() throws Exception {
        // Initialize the database
        calendrierModuleRepository.saveAndFlush(calendrierModule);

        // Get all the calendrierModuleList
        restCalendrierModuleMockMvc.perform(get("/api/calendrier-modules?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(calendrierModule.getId().intValue())))
            .andExpect(jsonPath("$.[*].libelle").value(hasItem(DEFAULT_LIBELLE.toString())))
            .andExpect(jsonPath("$.[*].dateControlContinu1").value(hasItem(DEFAULT_DATE_CONTROL_CONTINU_1.toString())))
            .andExpect(jsonPath("$.[*].dateControlContinu2").value(hasItem(DEFAULT_DATE_CONTROL_CONTINU_2.toString())));
    }
    
    @Test
    @Transactional
    public void getCalendrierModule() throws Exception {
        // Initialize the database
        calendrierModuleRepository.saveAndFlush(calendrierModule);

        // Get the calendrierModule
        restCalendrierModuleMockMvc.perform(get("/api/calendrier-modules/{id}", calendrierModule.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(calendrierModule.getId().intValue()))
            .andExpect(jsonPath("$.libelle").value(DEFAULT_LIBELLE.toString()))
            .andExpect(jsonPath("$.dateControlContinu1").value(DEFAULT_DATE_CONTROL_CONTINU_1.toString()))
            .andExpect(jsonPath("$.dateControlContinu2").value(DEFAULT_DATE_CONTROL_CONTINU_2.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCalendrierModule() throws Exception {
        // Get the calendrierModule
        restCalendrierModuleMockMvc.perform(get("/api/calendrier-modules/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCalendrierModule() throws Exception {
        // Initialize the database
        calendrierModuleRepository.saveAndFlush(calendrierModule);

        int databaseSizeBeforeUpdate = calendrierModuleRepository.findAll().size();

        // Update the calendrierModule
        CalendrierModule updatedCalendrierModule = calendrierModuleRepository.findById(calendrierModule.getId()).get();
        // Disconnect from session so that the updates on updatedCalendrierModule are not directly saved in db
        em.detach(updatedCalendrierModule);
        updatedCalendrierModule
            .libelle(UPDATED_LIBELLE)
            .dateControlContinu1(UPDATED_DATE_CONTROL_CONTINU_1)
            .dateControlContinu2(UPDATED_DATE_CONTROL_CONTINU_2);

        restCalendrierModuleMockMvc.perform(put("/api/calendrier-modules")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCalendrierModule)))
            .andExpect(status().isOk());

        // Validate the CalendrierModule in the database
        List<CalendrierModule> calendrierModuleList = calendrierModuleRepository.findAll();
        assertThat(calendrierModuleList).hasSize(databaseSizeBeforeUpdate);
        CalendrierModule testCalendrierModule = calendrierModuleList.get(calendrierModuleList.size() - 1);
        assertThat(testCalendrierModule.getLibelle()).isEqualTo(UPDATED_LIBELLE);
        assertThat(testCalendrierModule.getDateControlContinu1()).isEqualTo(UPDATED_DATE_CONTROL_CONTINU_1);
        assertThat(testCalendrierModule.getDateControlContinu2()).isEqualTo(UPDATED_DATE_CONTROL_CONTINU_2);

        // Validate the CalendrierModule in Elasticsearch
        verify(mockCalendrierModuleSearchRepository, times(1)).save(testCalendrierModule);
    }

    @Test
    @Transactional
    public void updateNonExistingCalendrierModule() throws Exception {
        int databaseSizeBeforeUpdate = calendrierModuleRepository.findAll().size();

        // Create the CalendrierModule

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCalendrierModuleMockMvc.perform(put("/api/calendrier-modules")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(calendrierModule)))
            .andExpect(status().isBadRequest());

        // Validate the CalendrierModule in the database
        List<CalendrierModule> calendrierModuleList = calendrierModuleRepository.findAll();
        assertThat(calendrierModuleList).hasSize(databaseSizeBeforeUpdate);

        // Validate the CalendrierModule in Elasticsearch
        verify(mockCalendrierModuleSearchRepository, times(0)).save(calendrierModule);
    }

    @Test
    @Transactional
    public void deleteCalendrierModule() throws Exception {
        // Initialize the database
        calendrierModuleRepository.saveAndFlush(calendrierModule);

        int databaseSizeBeforeDelete = calendrierModuleRepository.findAll().size();

        // Delete the calendrierModule
        restCalendrierModuleMockMvc.perform(delete("/api/calendrier-modules/{id}", calendrierModule.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<CalendrierModule> calendrierModuleList = calendrierModuleRepository.findAll();
        assertThat(calendrierModuleList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the CalendrierModule in Elasticsearch
        verify(mockCalendrierModuleSearchRepository, times(1)).deleteById(calendrierModule.getId());
    }

    @Test
    @Transactional
    public void searchCalendrierModule() throws Exception {
        // Initialize the database
        calendrierModuleRepository.saveAndFlush(calendrierModule);
        when(mockCalendrierModuleSearchRepository.search(queryStringQuery("id:" + calendrierModule.getId())))
            .thenReturn(Collections.singletonList(calendrierModule));
        // Search the calendrierModule
        restCalendrierModuleMockMvc.perform(get("/api/_search/calendrier-modules?query=id:" + calendrierModule.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(calendrierModule.getId().intValue())))
            .andExpect(jsonPath("$.[*].libelle").value(hasItem(DEFAULT_LIBELLE)))
            .andExpect(jsonPath("$.[*].dateControlContinu1").value(hasItem(DEFAULT_DATE_CONTROL_CONTINU_1.toString())))
            .andExpect(jsonPath("$.[*].dateControlContinu2").value(hasItem(DEFAULT_DATE_CONTROL_CONTINU_2.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CalendrierModule.class);
        CalendrierModule calendrierModule1 = new CalendrierModule();
        calendrierModule1.setId(1L);
        CalendrierModule calendrierModule2 = new CalendrierModule();
        calendrierModule2.setId(calendrierModule1.getId());
        assertThat(calendrierModule1).isEqualTo(calendrierModule2);
        calendrierModule2.setId(2L);
        assertThat(calendrierModule1).isNotEqualTo(calendrierModule2);
        calendrierModule1.setId(null);
        assertThat(calendrierModule1).isNotEqualTo(calendrierModule2);
    }
}
