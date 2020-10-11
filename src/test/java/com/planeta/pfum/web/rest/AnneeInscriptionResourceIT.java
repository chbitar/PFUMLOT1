package com.planeta.pfum.web.rest;

import com.planeta.pfum.Pfumv10App;
import com.planeta.pfum.domain.AnneeInscription;
import com.planeta.pfum.repository.AnneeInscriptionRepository;
import com.planeta.pfum.repository.search.AnneeInscriptionSearchRepository;
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

/**
 * Integration tests for the {@Link AnneeInscriptionResource} REST controller.
 */
@SpringBootTest(classes = Pfumv10App.class)
public class AnneeInscriptionResourceIT {

    private static final String DEFAULT_ANNEE = "AAAAAAAAAA";
    private static final String UPDATED_ANNEE = "BBBBBBBBBB";

    @Autowired
    private AnneeInscriptionRepository anneeInscriptionRepository;

    /**
     * This repository is mocked in the com.planeta.pfum.repository.search test package.
     *
     * @see com.planeta.pfum.repository.search.AnneeInscriptionSearchRepositoryMockConfiguration
     */
    @Autowired
    private AnneeInscriptionSearchRepository mockAnneeInscriptionSearchRepository;

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

    private MockMvc restAnneeInscriptionMockMvc;

    private AnneeInscription anneeInscription;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AnneeInscriptionResource anneeInscriptionResource = new AnneeInscriptionResource(anneeInscriptionRepository, mockAnneeInscriptionSearchRepository);
        this.restAnneeInscriptionMockMvc = MockMvcBuilders.standaloneSetup(anneeInscriptionResource)
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
    public static AnneeInscription createEntity(EntityManager em) {
        AnneeInscription anneeInscription = new AnneeInscription()
            .annee(DEFAULT_ANNEE);
        return anneeInscription;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AnneeInscription createUpdatedEntity(EntityManager em) {
        AnneeInscription anneeInscription = new AnneeInscription()
            .annee(UPDATED_ANNEE);
        return anneeInscription;
    }

    @BeforeEach
    public void initTest() {
        anneeInscription = createEntity(em);
    }

    @Test
    @Transactional
    public void createAnneeInscription() throws Exception {
        int databaseSizeBeforeCreate = anneeInscriptionRepository.findAll().size();

        // Create the AnneeInscription
        restAnneeInscriptionMockMvc.perform(post("/api/annee-inscriptions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(anneeInscription)))
            .andExpect(status().isCreated());

        // Validate the AnneeInscription in the database
        List<AnneeInscription> anneeInscriptionList = anneeInscriptionRepository.findAll();
        assertThat(anneeInscriptionList).hasSize(databaseSizeBeforeCreate + 1);
        AnneeInscription testAnneeInscription = anneeInscriptionList.get(anneeInscriptionList.size() - 1);
        assertThat(testAnneeInscription.getAnnee()).isEqualTo(DEFAULT_ANNEE);

        // Validate the AnneeInscription in Elasticsearch
        verify(mockAnneeInscriptionSearchRepository, times(1)).save(testAnneeInscription);
    }

    @Test
    @Transactional
    public void createAnneeInscriptionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = anneeInscriptionRepository.findAll().size();

        // Create the AnneeInscription with an existing ID
        anneeInscription.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAnneeInscriptionMockMvc.perform(post("/api/annee-inscriptions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(anneeInscription)))
            .andExpect(status().isBadRequest());

        // Validate the AnneeInscription in the database
        List<AnneeInscription> anneeInscriptionList = anneeInscriptionRepository.findAll();
        assertThat(anneeInscriptionList).hasSize(databaseSizeBeforeCreate);

        // Validate the AnneeInscription in Elasticsearch
        verify(mockAnneeInscriptionSearchRepository, times(0)).save(anneeInscription);
    }


    @Test
    @Transactional
    public void getAllAnneeInscriptions() throws Exception {
        // Initialize the database
        anneeInscriptionRepository.saveAndFlush(anneeInscription);

        // Get all the anneeInscriptionList
        restAnneeInscriptionMockMvc.perform(get("/api/annee-inscriptions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(anneeInscription.getId().intValue())))
            .andExpect(jsonPath("$.[*].annee").value(hasItem(DEFAULT_ANNEE.toString())));
    }
    
    @Test
    @Transactional
    public void getAnneeInscription() throws Exception {
        // Initialize the database
        anneeInscriptionRepository.saveAndFlush(anneeInscription);

        // Get the anneeInscription
        restAnneeInscriptionMockMvc.perform(get("/api/annee-inscriptions/{id}", anneeInscription.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(anneeInscription.getId().intValue()))
            .andExpect(jsonPath("$.annee").value(DEFAULT_ANNEE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingAnneeInscription() throws Exception {
        // Get the anneeInscription
        restAnneeInscriptionMockMvc.perform(get("/api/annee-inscriptions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAnneeInscription() throws Exception {
        // Initialize the database
        anneeInscriptionRepository.saveAndFlush(anneeInscription);

        int databaseSizeBeforeUpdate = anneeInscriptionRepository.findAll().size();

        // Update the anneeInscription
        AnneeInscription updatedAnneeInscription = anneeInscriptionRepository.findById(anneeInscription.getId()).get();
        // Disconnect from session so that the updates on updatedAnneeInscription are not directly saved in db
        em.detach(updatedAnneeInscription);
        updatedAnneeInscription
            .annee(UPDATED_ANNEE);

        restAnneeInscriptionMockMvc.perform(put("/api/annee-inscriptions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAnneeInscription)))
            .andExpect(status().isOk());

        // Validate the AnneeInscription in the database
        List<AnneeInscription> anneeInscriptionList = anneeInscriptionRepository.findAll();
        assertThat(anneeInscriptionList).hasSize(databaseSizeBeforeUpdate);
        AnneeInscription testAnneeInscription = anneeInscriptionList.get(anneeInscriptionList.size() - 1);
        assertThat(testAnneeInscription.getAnnee()).isEqualTo(UPDATED_ANNEE);

        // Validate the AnneeInscription in Elasticsearch
        verify(mockAnneeInscriptionSearchRepository, times(1)).save(testAnneeInscription);
    }

    @Test
    @Transactional
    public void updateNonExistingAnneeInscription() throws Exception {
        int databaseSizeBeforeUpdate = anneeInscriptionRepository.findAll().size();

        // Create the AnneeInscription

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAnneeInscriptionMockMvc.perform(put("/api/annee-inscriptions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(anneeInscription)))
            .andExpect(status().isBadRequest());

        // Validate the AnneeInscription in the database
        List<AnneeInscription> anneeInscriptionList = anneeInscriptionRepository.findAll();
        assertThat(anneeInscriptionList).hasSize(databaseSizeBeforeUpdate);

        // Validate the AnneeInscription in Elasticsearch
        verify(mockAnneeInscriptionSearchRepository, times(0)).save(anneeInscription);
    }

    @Test
    @Transactional
    public void deleteAnneeInscription() throws Exception {
        // Initialize the database
        anneeInscriptionRepository.saveAndFlush(anneeInscription);

        int databaseSizeBeforeDelete = anneeInscriptionRepository.findAll().size();

        // Delete the anneeInscription
        restAnneeInscriptionMockMvc.perform(delete("/api/annee-inscriptions/{id}", anneeInscription.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<AnneeInscription> anneeInscriptionList = anneeInscriptionRepository.findAll();
        assertThat(anneeInscriptionList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the AnneeInscription in Elasticsearch
        verify(mockAnneeInscriptionSearchRepository, times(1)).deleteById(anneeInscription.getId());
    }

    @Test
    @Transactional
    public void searchAnneeInscription() throws Exception {
        // Initialize the database
        anneeInscriptionRepository.saveAndFlush(anneeInscription);
        when(mockAnneeInscriptionSearchRepository.search(queryStringQuery("id:" + anneeInscription.getId())))
            .thenReturn(Collections.singletonList(anneeInscription));
        // Search the anneeInscription
        restAnneeInscriptionMockMvc.perform(get("/api/_search/annee-inscriptions?query=id:" + anneeInscription.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(anneeInscription.getId().intValue())))
            .andExpect(jsonPath("$.[*].annee").value(hasItem(DEFAULT_ANNEE)));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AnneeInscription.class);
        AnneeInscription anneeInscription1 = new AnneeInscription();
        anneeInscription1.setId(1L);
        AnneeInscription anneeInscription2 = new AnneeInscription();
        anneeInscription2.setId(anneeInscription1.getId());
        assertThat(anneeInscription1).isEqualTo(anneeInscription2);
        anneeInscription2.setId(2L);
        assertThat(anneeInscription1).isNotEqualTo(anneeInscription2);
        anneeInscription1.setId(null);
        assertThat(anneeInscription1).isNotEqualTo(anneeInscription2);
    }
}
