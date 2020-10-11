package com.planeta.pfum.web.rest;

import com.planeta.pfum.Pfumv10App;
import com.planeta.pfum.domain.ModalitePaiement;
import com.planeta.pfum.repository.ModalitePaiementRepository;
import com.planeta.pfum.repository.search.ModalitePaiementSearchRepository;
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

import com.planeta.pfum.domain.enumeration.Devise;
/**
 * Integration tests for the {@Link ModalitePaiementResource} REST controller.
 */
@SpringBootTest(classes = Pfumv10App.class)
public class ModalitePaiementResourceIT {

    private static final String DEFAULT_MODALITE = "AAAAAAAAAA";
    private static final String UPDATED_MODALITE = "BBBBBBBBBB";

    private static final Double DEFAULT_COUT_PROGRAMMETTC = 1D;
    private static final Double UPDATED_COUT_PROGRAMMETTC = 2D;

    private static final Double DEFAULT_COUT_PROGRAMMETTC_DEVISE = 1D;
    private static final Double UPDATED_COUT_PROGRAMMETTC_DEVISE = 2D;

    private static final Integer DEFAULT_REMISE_NIVEAU_1 = 1;
    private static final Integer UPDATED_REMISE_NIVEAU_1 = 2;

    private static final Integer DEFAULT_REMISE_NIVEAU_2 = 1;
    private static final Integer UPDATED_REMISE_NIVEAU_2 = 2;

    private static final Devise DEFAULT_DEVISE = Devise.MAD;
    private static final Devise UPDATED_DEVISE = Devise.USD;

    @Autowired
    private ModalitePaiementRepository modalitePaiementRepository;

    /**
     * This repository is mocked in the com.planeta.pfum.repository.search test package.
     *
     * @see com.planeta.pfum.repository.search.ModalitePaiementSearchRepositoryMockConfiguration
     */
    @Autowired
    private ModalitePaiementSearchRepository mockModalitePaiementSearchRepository;

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

    private MockMvc restModalitePaiementMockMvc;

    private ModalitePaiement modalitePaiement;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ModalitePaiementResource modalitePaiementResource = new ModalitePaiementResource(modalitePaiementRepository, mockModalitePaiementSearchRepository);
        this.restModalitePaiementMockMvc = MockMvcBuilders.standaloneSetup(modalitePaiementResource)
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
    public static ModalitePaiement createEntity(EntityManager em) {
        ModalitePaiement modalitePaiement = new ModalitePaiement()
            .modalite(DEFAULT_MODALITE)
            .coutProgrammettc(DEFAULT_COUT_PROGRAMMETTC)
            .coutProgrammettcDevise(DEFAULT_COUT_PROGRAMMETTC_DEVISE)
            .remiseNiveau1(DEFAULT_REMISE_NIVEAU_1)
            .remiseNiveau2(DEFAULT_REMISE_NIVEAU_2)
            .devise(DEFAULT_DEVISE);
        return modalitePaiement;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ModalitePaiement createUpdatedEntity(EntityManager em) {
        ModalitePaiement modalitePaiement = new ModalitePaiement()
            .modalite(UPDATED_MODALITE)
            .coutProgrammettc(UPDATED_COUT_PROGRAMMETTC)
            .coutProgrammettcDevise(UPDATED_COUT_PROGRAMMETTC_DEVISE)
            .remiseNiveau1(UPDATED_REMISE_NIVEAU_1)
            .remiseNiveau2(UPDATED_REMISE_NIVEAU_2)
            .devise(UPDATED_DEVISE);
        return modalitePaiement;
    }

    @BeforeEach
    public void initTest() {
        modalitePaiement = createEntity(em);
    }

    @Test
    @Transactional
    public void createModalitePaiement() throws Exception {
        int databaseSizeBeforeCreate = modalitePaiementRepository.findAll().size();

        // Create the ModalitePaiement
        restModalitePaiementMockMvc.perform(post("/api/modalite-paiements")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(modalitePaiement)))
            .andExpect(status().isCreated());

        // Validate the ModalitePaiement in the database
        List<ModalitePaiement> modalitePaiementList = modalitePaiementRepository.findAll();
        assertThat(modalitePaiementList).hasSize(databaseSizeBeforeCreate + 1);
        ModalitePaiement testModalitePaiement = modalitePaiementList.get(modalitePaiementList.size() - 1);
        assertThat(testModalitePaiement.getModalite()).isEqualTo(DEFAULT_MODALITE);
        assertThat(testModalitePaiement.getCoutProgrammettc()).isEqualTo(DEFAULT_COUT_PROGRAMMETTC);
        assertThat(testModalitePaiement.getCoutProgrammettcDevise()).isEqualTo(DEFAULT_COUT_PROGRAMMETTC_DEVISE);
        assertThat(testModalitePaiement.getRemiseNiveau1()).isEqualTo(DEFAULT_REMISE_NIVEAU_1);
        assertThat(testModalitePaiement.getRemiseNiveau2()).isEqualTo(DEFAULT_REMISE_NIVEAU_2);
        assertThat(testModalitePaiement.getDevise()).isEqualTo(DEFAULT_DEVISE);

        // Validate the ModalitePaiement in Elasticsearch
        verify(mockModalitePaiementSearchRepository, times(1)).save(testModalitePaiement);
    }

    @Test
    @Transactional
    public void createModalitePaiementWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = modalitePaiementRepository.findAll().size();

        // Create the ModalitePaiement with an existing ID
        modalitePaiement.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restModalitePaiementMockMvc.perform(post("/api/modalite-paiements")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(modalitePaiement)))
            .andExpect(status().isBadRequest());

        // Validate the ModalitePaiement in the database
        List<ModalitePaiement> modalitePaiementList = modalitePaiementRepository.findAll();
        assertThat(modalitePaiementList).hasSize(databaseSizeBeforeCreate);

        // Validate the ModalitePaiement in Elasticsearch
        verify(mockModalitePaiementSearchRepository, times(0)).save(modalitePaiement);
    }


    @Test
    @Transactional
    public void getAllModalitePaiements() throws Exception {
        // Initialize the database
        modalitePaiementRepository.saveAndFlush(modalitePaiement);

        // Get all the modalitePaiementList
        restModalitePaiementMockMvc.perform(get("/api/modalite-paiements?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(modalitePaiement.getId().intValue())))
            .andExpect(jsonPath("$.[*].modalite").value(hasItem(DEFAULT_MODALITE.toString())))
            .andExpect(jsonPath("$.[*].coutProgrammettc").value(hasItem(DEFAULT_COUT_PROGRAMMETTC.doubleValue())))
            .andExpect(jsonPath("$.[*].coutProgrammettcDevise").value(hasItem(DEFAULT_COUT_PROGRAMMETTC_DEVISE.doubleValue())))
            .andExpect(jsonPath("$.[*].remiseNiveau1").value(hasItem(DEFAULT_REMISE_NIVEAU_1)))
            .andExpect(jsonPath("$.[*].remiseNiveau2").value(hasItem(DEFAULT_REMISE_NIVEAU_2)))
            .andExpect(jsonPath("$.[*].devise").value(hasItem(DEFAULT_DEVISE.toString())));
    }
    
    @Test
    @Transactional
    public void getModalitePaiement() throws Exception {
        // Initialize the database
        modalitePaiementRepository.saveAndFlush(modalitePaiement);

        // Get the modalitePaiement
        restModalitePaiementMockMvc.perform(get("/api/modalite-paiements/{id}", modalitePaiement.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(modalitePaiement.getId().intValue()))
            .andExpect(jsonPath("$.modalite").value(DEFAULT_MODALITE.toString()))
            .andExpect(jsonPath("$.coutProgrammettc").value(DEFAULT_COUT_PROGRAMMETTC.doubleValue()))
            .andExpect(jsonPath("$.coutProgrammettcDevise").value(DEFAULT_COUT_PROGRAMMETTC_DEVISE.doubleValue()))
            .andExpect(jsonPath("$.remiseNiveau1").value(DEFAULT_REMISE_NIVEAU_1))
            .andExpect(jsonPath("$.remiseNiveau2").value(DEFAULT_REMISE_NIVEAU_2))
            .andExpect(jsonPath("$.devise").value(DEFAULT_DEVISE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingModalitePaiement() throws Exception {
        // Get the modalitePaiement
        restModalitePaiementMockMvc.perform(get("/api/modalite-paiements/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateModalitePaiement() throws Exception {
        // Initialize the database
        modalitePaiementRepository.saveAndFlush(modalitePaiement);

        int databaseSizeBeforeUpdate = modalitePaiementRepository.findAll().size();

        // Update the modalitePaiement
        ModalitePaiement updatedModalitePaiement = modalitePaiementRepository.findById(modalitePaiement.getId()).get();
        // Disconnect from session so that the updates on updatedModalitePaiement are not directly saved in db
        em.detach(updatedModalitePaiement);
        updatedModalitePaiement
            .modalite(UPDATED_MODALITE)
            .coutProgrammettc(UPDATED_COUT_PROGRAMMETTC)
            .coutProgrammettcDevise(UPDATED_COUT_PROGRAMMETTC_DEVISE)
            .remiseNiveau1(UPDATED_REMISE_NIVEAU_1)
            .remiseNiveau2(UPDATED_REMISE_NIVEAU_2)
            .devise(UPDATED_DEVISE);

        restModalitePaiementMockMvc.perform(put("/api/modalite-paiements")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedModalitePaiement)))
            .andExpect(status().isOk());

        // Validate the ModalitePaiement in the database
        List<ModalitePaiement> modalitePaiementList = modalitePaiementRepository.findAll();
        assertThat(modalitePaiementList).hasSize(databaseSizeBeforeUpdate);
        ModalitePaiement testModalitePaiement = modalitePaiementList.get(modalitePaiementList.size() - 1);
        assertThat(testModalitePaiement.getModalite()).isEqualTo(UPDATED_MODALITE);
        assertThat(testModalitePaiement.getCoutProgrammettc()).isEqualTo(UPDATED_COUT_PROGRAMMETTC);
        assertThat(testModalitePaiement.getCoutProgrammettcDevise()).isEqualTo(UPDATED_COUT_PROGRAMMETTC_DEVISE);
        assertThat(testModalitePaiement.getRemiseNiveau1()).isEqualTo(UPDATED_REMISE_NIVEAU_1);
        assertThat(testModalitePaiement.getRemiseNiveau2()).isEqualTo(UPDATED_REMISE_NIVEAU_2);
        assertThat(testModalitePaiement.getDevise()).isEqualTo(UPDATED_DEVISE);

        // Validate the ModalitePaiement in Elasticsearch
        verify(mockModalitePaiementSearchRepository, times(1)).save(testModalitePaiement);
    }

    @Test
    @Transactional
    public void updateNonExistingModalitePaiement() throws Exception {
        int databaseSizeBeforeUpdate = modalitePaiementRepository.findAll().size();

        // Create the ModalitePaiement

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restModalitePaiementMockMvc.perform(put("/api/modalite-paiements")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(modalitePaiement)))
            .andExpect(status().isBadRequest());

        // Validate the ModalitePaiement in the database
        List<ModalitePaiement> modalitePaiementList = modalitePaiementRepository.findAll();
        assertThat(modalitePaiementList).hasSize(databaseSizeBeforeUpdate);

        // Validate the ModalitePaiement in Elasticsearch
        verify(mockModalitePaiementSearchRepository, times(0)).save(modalitePaiement);
    }

    @Test
    @Transactional
    public void deleteModalitePaiement() throws Exception {
        // Initialize the database
        modalitePaiementRepository.saveAndFlush(modalitePaiement);

        int databaseSizeBeforeDelete = modalitePaiementRepository.findAll().size();

        // Delete the modalitePaiement
        restModalitePaiementMockMvc.perform(delete("/api/modalite-paiements/{id}", modalitePaiement.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ModalitePaiement> modalitePaiementList = modalitePaiementRepository.findAll();
        assertThat(modalitePaiementList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the ModalitePaiement in Elasticsearch
        verify(mockModalitePaiementSearchRepository, times(1)).deleteById(modalitePaiement.getId());
    }

    @Test
    @Transactional
    public void searchModalitePaiement() throws Exception {
        // Initialize the database
        modalitePaiementRepository.saveAndFlush(modalitePaiement);
        when(mockModalitePaiementSearchRepository.search(queryStringQuery("id:" + modalitePaiement.getId())))
            .thenReturn(Collections.singletonList(modalitePaiement));
        // Search the modalitePaiement
        restModalitePaiementMockMvc.perform(get("/api/_search/modalite-paiements?query=id:" + modalitePaiement.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(modalitePaiement.getId().intValue())))
            .andExpect(jsonPath("$.[*].modalite").value(hasItem(DEFAULT_MODALITE)))
            .andExpect(jsonPath("$.[*].coutProgrammettc").value(hasItem(DEFAULT_COUT_PROGRAMMETTC.doubleValue())))
            .andExpect(jsonPath("$.[*].coutProgrammettcDevise").value(hasItem(DEFAULT_COUT_PROGRAMMETTC_DEVISE.doubleValue())))
            .andExpect(jsonPath("$.[*].remiseNiveau1").value(hasItem(DEFAULT_REMISE_NIVEAU_1)))
            .andExpect(jsonPath("$.[*].remiseNiveau2").value(hasItem(DEFAULT_REMISE_NIVEAU_2)))
            .andExpect(jsonPath("$.[*].devise").value(hasItem(DEFAULT_DEVISE.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ModalitePaiement.class);
        ModalitePaiement modalitePaiement1 = new ModalitePaiement();
        modalitePaiement1.setId(1L);
        ModalitePaiement modalitePaiement2 = new ModalitePaiement();
        modalitePaiement2.setId(modalitePaiement1.getId());
        assertThat(modalitePaiement1).isEqualTo(modalitePaiement2);
        modalitePaiement2.setId(2L);
        assertThat(modalitePaiement1).isNotEqualTo(modalitePaiement2);
        modalitePaiement1.setId(null);
        assertThat(modalitePaiement1).isNotEqualTo(modalitePaiement2);
    }
}
