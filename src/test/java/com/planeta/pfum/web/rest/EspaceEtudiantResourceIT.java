package com.planeta.pfum.web.rest;

import com.planeta.pfum.Pfumv10App;
import com.planeta.pfum.domain.EspaceEtudiant;
import com.planeta.pfum.repository.EspaceEtudiantRepository;
import com.planeta.pfum.repository.search.EspaceEtudiantSearchRepository;
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

/**
 * Integration tests for the {@Link EspaceEtudiantResource} REST controller.
 */
@SpringBootTest(classes = Pfumv10App.class)
public class EspaceEtudiantResourceIT {

    private static final byte[] DEFAULT_EMPLOI_DU_TEMPS = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_EMPLOI_DU_TEMPS = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_EMPLOI_DU_TEMPS_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_EMPLOI_DU_TEMPS_CONTENT_TYPE = "image/png";

    @Autowired
    private EspaceEtudiantRepository espaceEtudiantRepository;

    /**
     * This repository is mocked in the com.planeta.pfum.repository.search test package.
     *
     * @see com.planeta.pfum.repository.search.EspaceEtudiantSearchRepositoryMockConfiguration
     */
    @Autowired
    private EspaceEtudiantSearchRepository mockEspaceEtudiantSearchRepository;

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

    private MockMvc restEspaceEtudiantMockMvc;

    private EspaceEtudiant espaceEtudiant;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EspaceEtudiantResource espaceEtudiantResource = new EspaceEtudiantResource(espaceEtudiantRepository, mockEspaceEtudiantSearchRepository);
        this.restEspaceEtudiantMockMvc = MockMvcBuilders.standaloneSetup(espaceEtudiantResource)
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
    public static EspaceEtudiant createEntity(EntityManager em) {
        EspaceEtudiant espaceEtudiant = new EspaceEtudiant()
            .emploiDuTemps(DEFAULT_EMPLOI_DU_TEMPS)
            .emploiDuTempsContentType(DEFAULT_EMPLOI_DU_TEMPS_CONTENT_TYPE);
        return espaceEtudiant;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static EspaceEtudiant createUpdatedEntity(EntityManager em) {
        EspaceEtudiant espaceEtudiant = new EspaceEtudiant()
            .emploiDuTemps(UPDATED_EMPLOI_DU_TEMPS)
            .emploiDuTempsContentType(UPDATED_EMPLOI_DU_TEMPS_CONTENT_TYPE);
        return espaceEtudiant;
    }

    @BeforeEach
    public void initTest() {
        espaceEtudiant = createEntity(em);
    }

    @Test
    @Transactional
    public void createEspaceEtudiant() throws Exception {
        int databaseSizeBeforeCreate = espaceEtudiantRepository.findAll().size();

        // Create the EspaceEtudiant
        restEspaceEtudiantMockMvc.perform(post("/api/espace-etudiants")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(espaceEtudiant)))
            .andExpect(status().isCreated());

        // Validate the EspaceEtudiant in the database
        List<EspaceEtudiant> espaceEtudiantList = espaceEtudiantRepository.findAll();
        assertThat(espaceEtudiantList).hasSize(databaseSizeBeforeCreate + 1);
        EspaceEtudiant testEspaceEtudiant = espaceEtudiantList.get(espaceEtudiantList.size() - 1);
        assertThat(testEspaceEtudiant.getEmploiDuTemps()).isEqualTo(DEFAULT_EMPLOI_DU_TEMPS);
        assertThat(testEspaceEtudiant.getEmploiDuTempsContentType()).isEqualTo(DEFAULT_EMPLOI_DU_TEMPS_CONTENT_TYPE);

        // Validate the EspaceEtudiant in Elasticsearch
        verify(mockEspaceEtudiantSearchRepository, times(1)).save(testEspaceEtudiant);
    }

    @Test
    @Transactional
    public void createEspaceEtudiantWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = espaceEtudiantRepository.findAll().size();

        // Create the EspaceEtudiant with an existing ID
        espaceEtudiant.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEspaceEtudiantMockMvc.perform(post("/api/espace-etudiants")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(espaceEtudiant)))
            .andExpect(status().isBadRequest());

        // Validate the EspaceEtudiant in the database
        List<EspaceEtudiant> espaceEtudiantList = espaceEtudiantRepository.findAll();
        assertThat(espaceEtudiantList).hasSize(databaseSizeBeforeCreate);

        // Validate the EspaceEtudiant in Elasticsearch
        verify(mockEspaceEtudiantSearchRepository, times(0)).save(espaceEtudiant);
    }


    @Test
    @Transactional
    public void getAllEspaceEtudiants() throws Exception {
        // Initialize the database
        espaceEtudiantRepository.saveAndFlush(espaceEtudiant);

        // Get all the espaceEtudiantList
        restEspaceEtudiantMockMvc.perform(get("/api/espace-etudiants?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(espaceEtudiant.getId().intValue())))
            .andExpect(jsonPath("$.[*].emploiDuTempsContentType").value(hasItem(DEFAULT_EMPLOI_DU_TEMPS_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].emploiDuTemps").value(hasItem(Base64Utils.encodeToString(DEFAULT_EMPLOI_DU_TEMPS))));
    }
    
    @Test
    @Transactional
    public void getEspaceEtudiant() throws Exception {
        // Initialize the database
        espaceEtudiantRepository.saveAndFlush(espaceEtudiant);

        // Get the espaceEtudiant
        restEspaceEtudiantMockMvc.perform(get("/api/espace-etudiants/{id}", espaceEtudiant.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(espaceEtudiant.getId().intValue()))
            .andExpect(jsonPath("$.emploiDuTempsContentType").value(DEFAULT_EMPLOI_DU_TEMPS_CONTENT_TYPE))
            .andExpect(jsonPath("$.emploiDuTemps").value(Base64Utils.encodeToString(DEFAULT_EMPLOI_DU_TEMPS)));
    }

    @Test
    @Transactional
    public void getNonExistingEspaceEtudiant() throws Exception {
        // Get the espaceEtudiant
        restEspaceEtudiantMockMvc.perform(get("/api/espace-etudiants/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEspaceEtudiant() throws Exception {
        // Initialize the database
        espaceEtudiantRepository.saveAndFlush(espaceEtudiant);

        int databaseSizeBeforeUpdate = espaceEtudiantRepository.findAll().size();

        // Update the espaceEtudiant
        EspaceEtudiant updatedEspaceEtudiant = espaceEtudiantRepository.findById(espaceEtudiant.getId()).get();
        // Disconnect from session so that the updates on updatedEspaceEtudiant are not directly saved in db
        em.detach(updatedEspaceEtudiant);
        updatedEspaceEtudiant
            .emploiDuTemps(UPDATED_EMPLOI_DU_TEMPS)
            .emploiDuTempsContentType(UPDATED_EMPLOI_DU_TEMPS_CONTENT_TYPE);

        restEspaceEtudiantMockMvc.perform(put("/api/espace-etudiants")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEspaceEtudiant)))
            .andExpect(status().isOk());

        // Validate the EspaceEtudiant in the database
        List<EspaceEtudiant> espaceEtudiantList = espaceEtudiantRepository.findAll();
        assertThat(espaceEtudiantList).hasSize(databaseSizeBeforeUpdate);
        EspaceEtudiant testEspaceEtudiant = espaceEtudiantList.get(espaceEtudiantList.size() - 1);
        assertThat(testEspaceEtudiant.getEmploiDuTemps()).isEqualTo(UPDATED_EMPLOI_DU_TEMPS);
        assertThat(testEspaceEtudiant.getEmploiDuTempsContentType()).isEqualTo(UPDATED_EMPLOI_DU_TEMPS_CONTENT_TYPE);

        // Validate the EspaceEtudiant in Elasticsearch
        verify(mockEspaceEtudiantSearchRepository, times(1)).save(testEspaceEtudiant);
    }

    @Test
    @Transactional
    public void updateNonExistingEspaceEtudiant() throws Exception {
        int databaseSizeBeforeUpdate = espaceEtudiantRepository.findAll().size();

        // Create the EspaceEtudiant

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEspaceEtudiantMockMvc.perform(put("/api/espace-etudiants")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(espaceEtudiant)))
            .andExpect(status().isBadRequest());

        // Validate the EspaceEtudiant in the database
        List<EspaceEtudiant> espaceEtudiantList = espaceEtudiantRepository.findAll();
        assertThat(espaceEtudiantList).hasSize(databaseSizeBeforeUpdate);

        // Validate the EspaceEtudiant in Elasticsearch
        verify(mockEspaceEtudiantSearchRepository, times(0)).save(espaceEtudiant);
    }

    @Test
    @Transactional
    public void deleteEspaceEtudiant() throws Exception {
        // Initialize the database
        espaceEtudiantRepository.saveAndFlush(espaceEtudiant);

        int databaseSizeBeforeDelete = espaceEtudiantRepository.findAll().size();

        // Delete the espaceEtudiant
        restEspaceEtudiantMockMvc.perform(delete("/api/espace-etudiants/{id}", espaceEtudiant.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<EspaceEtudiant> espaceEtudiantList = espaceEtudiantRepository.findAll();
        assertThat(espaceEtudiantList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the EspaceEtudiant in Elasticsearch
        verify(mockEspaceEtudiantSearchRepository, times(1)).deleteById(espaceEtudiant.getId());
    }

    @Test
    @Transactional
    public void searchEspaceEtudiant() throws Exception {
        // Initialize the database
        espaceEtudiantRepository.saveAndFlush(espaceEtudiant);
        when(mockEspaceEtudiantSearchRepository.search(queryStringQuery("id:" + espaceEtudiant.getId())))
            .thenReturn(Collections.singletonList(espaceEtudiant));
        // Search the espaceEtudiant
        restEspaceEtudiantMockMvc.perform(get("/api/_search/espace-etudiants?query=id:" + espaceEtudiant.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(espaceEtudiant.getId().intValue())))
            .andExpect(jsonPath("$.[*].emploiDuTempsContentType").value(hasItem(DEFAULT_EMPLOI_DU_TEMPS_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].emploiDuTemps").value(hasItem(Base64Utils.encodeToString(DEFAULT_EMPLOI_DU_TEMPS))));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EspaceEtudiant.class);
        EspaceEtudiant espaceEtudiant1 = new EspaceEtudiant();
        espaceEtudiant1.setId(1L);
        EspaceEtudiant espaceEtudiant2 = new EspaceEtudiant();
        espaceEtudiant2.setId(espaceEtudiant1.getId());
        assertThat(espaceEtudiant1).isEqualTo(espaceEtudiant2);
        espaceEtudiant2.setId(2L);
        assertThat(espaceEtudiant1).isNotEqualTo(espaceEtudiant2);
        espaceEtudiant1.setId(null);
        assertThat(espaceEtudiant1).isNotEqualTo(espaceEtudiant2);
    }
}
