package com.planeta.pfum.web.rest;

import com.planeta.pfum.Pfumv10App;
import com.planeta.pfum.domain.EmploieDuTemps;
import com.planeta.pfum.repository.EmploieDuTempsRepository;
import com.planeta.pfum.repository.search.EmploieDuTempsSearchRepository;
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
import org.springframework.util.Base64Utils;
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

import com.planeta.pfum.domain.enumeration.Programme;
/**
 * Integration tests for the {@Link EmploieDuTempsResource} REST controller.
 */
@SpringBootTest(classes = Pfumv10App.class)
public class EmploieDuTempsResourceIT {

    private static final byte[] DEFAULT_EMPLOIE_DU_TEMPS = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_EMPLOIE_DU_TEMPS = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_EMPLOIE_DU_TEMPS_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_EMPLOIE_DU_TEMPS_CONTENT_TYPE = "image/png";

    private static final Programme DEFAULT_PROGRAMME = Programme.LICENCE;
    private static final Programme UPDATED_PROGRAMME = Programme.MASTER;

    @Autowired
    private EmploieDuTempsRepository emploieDuTempsRepository;

    /**
     * This repository is mocked in the com.planeta.pfum.repository.search test package.
     *
     * @see com.planeta.pfum.repository.search.EmploieDuTempsSearchRepositoryMockConfiguration
     */
    @Autowired
    private EmploieDuTempsSearchRepository mockEmploieDuTempsSearchRepository;

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

    private MockMvc restEmploieDuTempsMockMvc;

    private EmploieDuTemps emploieDuTemps;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EmploieDuTempsResource emploieDuTempsResource = new EmploieDuTempsResource(emploieDuTempsRepository, mockEmploieDuTempsSearchRepository);
        this.restEmploieDuTempsMockMvc = MockMvcBuilders.standaloneSetup(emploieDuTempsResource)
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
    public static EmploieDuTemps createEntity(EntityManager em) {
        EmploieDuTemps emploieDuTemps = new EmploieDuTemps()
            .emploieDuTemps(DEFAULT_EMPLOIE_DU_TEMPS)
            .emploieDuTempsContentType(DEFAULT_EMPLOIE_DU_TEMPS_CONTENT_TYPE)
            .programme(DEFAULT_PROGRAMME);
        return emploieDuTemps;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static EmploieDuTemps createUpdatedEntity(EntityManager em) {
        EmploieDuTemps emploieDuTemps = new EmploieDuTemps()
            .emploieDuTemps(UPDATED_EMPLOIE_DU_TEMPS)
            .emploieDuTempsContentType(UPDATED_EMPLOIE_DU_TEMPS_CONTENT_TYPE)
            .programme(UPDATED_PROGRAMME);
        return emploieDuTemps;
    }

    @BeforeEach
    public void initTest() {
        emploieDuTemps = createEntity(em);
    }

    @Test
    @Transactional
    public void createEmploieDuTemps() throws Exception {
        int databaseSizeBeforeCreate = emploieDuTempsRepository.findAll().size();

        // Create the EmploieDuTemps
        restEmploieDuTempsMockMvc.perform(post("/api/emploie-du-temps")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(emploieDuTemps)))
            .andExpect(status().isCreated());

        // Validate the EmploieDuTemps in the database
        List<EmploieDuTemps> emploieDuTempsList = emploieDuTempsRepository.findAll();
        assertThat(emploieDuTempsList).hasSize(databaseSizeBeforeCreate + 1);
        EmploieDuTemps testEmploieDuTemps = emploieDuTempsList.get(emploieDuTempsList.size() - 1);
        assertThat(testEmploieDuTemps.getEmploieDuTemps()).isEqualTo(DEFAULT_EMPLOIE_DU_TEMPS);
        assertThat(testEmploieDuTemps.getEmploieDuTempsContentType()).isEqualTo(DEFAULT_EMPLOIE_DU_TEMPS_CONTENT_TYPE);
        assertThat(testEmploieDuTemps.getProgramme()).isEqualTo(DEFAULT_PROGRAMME);

        // Validate the EmploieDuTemps in Elasticsearch
        verify(mockEmploieDuTempsSearchRepository, times(1)).save(testEmploieDuTemps);
    }

    @Test
    @Transactional
    public void createEmploieDuTempsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = emploieDuTempsRepository.findAll().size();

        // Create the EmploieDuTemps with an existing ID
        emploieDuTemps.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEmploieDuTempsMockMvc.perform(post("/api/emploie-du-temps")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(emploieDuTemps)))
            .andExpect(status().isBadRequest());

        // Validate the EmploieDuTemps in the database
        List<EmploieDuTemps> emploieDuTempsList = emploieDuTempsRepository.findAll();
        assertThat(emploieDuTempsList).hasSize(databaseSizeBeforeCreate);

        // Validate the EmploieDuTemps in Elasticsearch
        verify(mockEmploieDuTempsSearchRepository, times(0)).save(emploieDuTemps);
    }


    @Test
    @Transactional
    public void getAllEmploieDuTemps() throws Exception {
        // Initialize the database
        emploieDuTempsRepository.saveAndFlush(emploieDuTemps);

        // Get all the emploieDuTempsList
        restEmploieDuTempsMockMvc.perform(get("/api/emploie-du-temps?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(emploieDuTemps.getId().intValue())))
            .andExpect(jsonPath("$.[*].emploieDuTempsContentType").value(hasItem(DEFAULT_EMPLOIE_DU_TEMPS_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].emploieDuTemps").value(hasItem(Base64Utils.encodeToString(DEFAULT_EMPLOIE_DU_TEMPS))))
            .andExpect(jsonPath("$.[*].programme").value(hasItem(DEFAULT_PROGRAMME.toString())));
    }
    
    @Test
    @Transactional
    public void getEmploieDuTemps() throws Exception {
        // Initialize the database
        emploieDuTempsRepository.saveAndFlush(emploieDuTemps);

        // Get the emploieDuTemps
        restEmploieDuTempsMockMvc.perform(get("/api/emploie-du-temps/{id}", emploieDuTemps.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(emploieDuTemps.getId().intValue()))
            .andExpect(jsonPath("$.emploieDuTempsContentType").value(DEFAULT_EMPLOIE_DU_TEMPS_CONTENT_TYPE))
            .andExpect(jsonPath("$.emploieDuTemps").value(Base64Utils.encodeToString(DEFAULT_EMPLOIE_DU_TEMPS)))
            .andExpect(jsonPath("$.programme").value(DEFAULT_PROGRAMME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingEmploieDuTemps() throws Exception {
        // Get the emploieDuTemps
        restEmploieDuTempsMockMvc.perform(get("/api/emploie-du-temps/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEmploieDuTemps() throws Exception {
        // Initialize the database
        emploieDuTempsRepository.saveAndFlush(emploieDuTemps);

        int databaseSizeBeforeUpdate = emploieDuTempsRepository.findAll().size();

        // Update the emploieDuTemps
        EmploieDuTemps updatedEmploieDuTemps = emploieDuTempsRepository.findById(emploieDuTemps.getId()).get();
        // Disconnect from session so that the updates on updatedEmploieDuTemps are not directly saved in db
        em.detach(updatedEmploieDuTemps);
        updatedEmploieDuTemps
            .emploieDuTemps(UPDATED_EMPLOIE_DU_TEMPS)
            .emploieDuTempsContentType(UPDATED_EMPLOIE_DU_TEMPS_CONTENT_TYPE)
            .programme(UPDATED_PROGRAMME);

        restEmploieDuTempsMockMvc.perform(put("/api/emploie-du-temps")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEmploieDuTemps)))
            .andExpect(status().isOk());

        // Validate the EmploieDuTemps in the database
        List<EmploieDuTemps> emploieDuTempsList = emploieDuTempsRepository.findAll();
        assertThat(emploieDuTempsList).hasSize(databaseSizeBeforeUpdate);
        EmploieDuTemps testEmploieDuTemps = emploieDuTempsList.get(emploieDuTempsList.size() - 1);
        assertThat(testEmploieDuTemps.getEmploieDuTemps()).isEqualTo(UPDATED_EMPLOIE_DU_TEMPS);
        assertThat(testEmploieDuTemps.getEmploieDuTempsContentType()).isEqualTo(UPDATED_EMPLOIE_DU_TEMPS_CONTENT_TYPE);
        assertThat(testEmploieDuTemps.getProgramme()).isEqualTo(UPDATED_PROGRAMME);

        // Validate the EmploieDuTemps in Elasticsearch
        verify(mockEmploieDuTempsSearchRepository, times(1)).save(testEmploieDuTemps);
    }

    @Test
    @Transactional
    public void updateNonExistingEmploieDuTemps() throws Exception {
        int databaseSizeBeforeUpdate = emploieDuTempsRepository.findAll().size();

        // Create the EmploieDuTemps

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEmploieDuTempsMockMvc.perform(put("/api/emploie-du-temps")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(emploieDuTemps)))
            .andExpect(status().isBadRequest());

        // Validate the EmploieDuTemps in the database
        List<EmploieDuTemps> emploieDuTempsList = emploieDuTempsRepository.findAll();
        assertThat(emploieDuTempsList).hasSize(databaseSizeBeforeUpdate);

        // Validate the EmploieDuTemps in Elasticsearch
        verify(mockEmploieDuTempsSearchRepository, times(0)).save(emploieDuTemps);
    }

    @Test
    @Transactional
    public void deleteEmploieDuTemps() throws Exception {
        // Initialize the database
        emploieDuTempsRepository.saveAndFlush(emploieDuTemps);

        int databaseSizeBeforeDelete = emploieDuTempsRepository.findAll().size();

        // Delete the emploieDuTemps
        restEmploieDuTempsMockMvc.perform(delete("/api/emploie-du-temps/{id}", emploieDuTemps.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<EmploieDuTemps> emploieDuTempsList = emploieDuTempsRepository.findAll();
        assertThat(emploieDuTempsList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the EmploieDuTemps in Elasticsearch
        verify(mockEmploieDuTempsSearchRepository, times(1)).deleteById(emploieDuTemps.getId());
    }

    @Test
    @Transactional
    public void searchEmploieDuTemps() throws Exception {
        // Initialize the database
        emploieDuTempsRepository.saveAndFlush(emploieDuTemps);
        when(mockEmploieDuTempsSearchRepository.search(queryStringQuery("id:" + emploieDuTemps.getId())))
            .thenReturn(Collections.singletonList(emploieDuTemps));
        // Search the emploieDuTemps
        restEmploieDuTempsMockMvc.perform(get("/api/_search/emploie-du-temps?query=id:" + emploieDuTemps.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(emploieDuTemps.getId().intValue())))
            .andExpect(jsonPath("$.[*].emploieDuTempsContentType").value(hasItem(DEFAULT_EMPLOIE_DU_TEMPS_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].emploieDuTemps").value(hasItem(Base64Utils.encodeToString(DEFAULT_EMPLOIE_DU_TEMPS))))
            .andExpect(jsonPath("$.[*].programme").value(hasItem(DEFAULT_PROGRAMME.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EmploieDuTemps.class);
        EmploieDuTemps emploieDuTemps1 = new EmploieDuTemps();
        emploieDuTemps1.setId(1L);
        EmploieDuTemps emploieDuTemps2 = new EmploieDuTemps();
        emploieDuTemps2.setId(emploieDuTemps1.getId());
        assertThat(emploieDuTemps1).isEqualTo(emploieDuTemps2);
        emploieDuTemps2.setId(2L);
        assertThat(emploieDuTemps1).isNotEqualTo(emploieDuTemps2);
        emploieDuTemps1.setId(null);
        assertThat(emploieDuTemps1).isNotEqualTo(emploieDuTemps2);
    }
}
