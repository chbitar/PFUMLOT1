package com.planeta.pfum.web.rest;

import com.planeta.pfum.Pfumv10App;
import com.planeta.pfum.domain.Etablissement;
import com.planeta.pfum.repository.EtablissementRepository;
import com.planeta.pfum.repository.search.EtablissementSearchRepository;
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
 * Integration tests for the {@Link EtablissementResource} REST controller.
 */
@SpringBootTest(classes = Pfumv10App.class)
public class EtablissementResourceIT {

    private static final String DEFAULT_NOM_ECOLE = "AAAAAAAAAA";
    private static final String UPDATED_NOM_ECOLE = "BBBBBBBBBB";

    private static final String DEFAULT_ADRESSE = "AAAAAAAAAA";
    private static final String UPDATED_ADRESSE = "BBBBBBBBBB";

    private static final String DEFAULT_RC = "AAAAAAAAAA";
    private static final String UPDATED_RC = "BBBBBBBBBB";

    private static final String DEFAULT_ICE = "AAAAAAAAAA";
    private static final String UPDATED_ICE = "BBBBBBBBBB";

    private static final String DEFAULT_TP = "AAAAAAAAAA";
    private static final String UPDATED_TP = "BBBBBBBBBB";

    private static final String DEFAULT_IDENTITE_FICHE = "AAAAAAAAAA";
    private static final String UPDATED_IDENTITE_FICHE = "BBBBBBBBBB";

    private static final byte[] DEFAULT_LOGO = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_LOGO = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_LOGO_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_LOGO_CONTENT_TYPE = "image/png";

    @Autowired
    private EtablissementRepository etablissementRepository;

    /**
     * This repository is mocked in the com.planeta.pfum.repository.search test package.
     *
     * @see com.planeta.pfum.repository.search.EtablissementSearchRepositoryMockConfiguration
     */
    @Autowired
    private EtablissementSearchRepository mockEtablissementSearchRepository;

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

    private MockMvc restEtablissementMockMvc;

    private Etablissement etablissement;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EtablissementResource etablissementResource = new EtablissementResource(etablissementRepository, mockEtablissementSearchRepository);
        this.restEtablissementMockMvc = MockMvcBuilders.standaloneSetup(etablissementResource)
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
    public static Etablissement createEntity(EntityManager em) {
        Etablissement etablissement = new Etablissement()
            .nomEcole(DEFAULT_NOM_ECOLE)
            .adresse(DEFAULT_ADRESSE)
            .rc(DEFAULT_RC)
            .ice(DEFAULT_ICE)
            .tp(DEFAULT_TP)
            .identiteFiche(DEFAULT_IDENTITE_FICHE)
            .logo(DEFAULT_LOGO)
            .logoContentType(DEFAULT_LOGO_CONTENT_TYPE);
        return etablissement;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Etablissement createUpdatedEntity(EntityManager em) {
        Etablissement etablissement = new Etablissement()
            .nomEcole(UPDATED_NOM_ECOLE)
            .adresse(UPDATED_ADRESSE)
            .rc(UPDATED_RC)
            .ice(UPDATED_ICE)
            .tp(UPDATED_TP)
            .identiteFiche(UPDATED_IDENTITE_FICHE)
            .logo(UPDATED_LOGO)
            .logoContentType(UPDATED_LOGO_CONTENT_TYPE);
        return etablissement;
    }

    @BeforeEach
    public void initTest() {
        etablissement = createEntity(em);
    }

    @Test
    @Transactional
    public void createEtablissement() throws Exception {
        int databaseSizeBeforeCreate = etablissementRepository.findAll().size();

        // Create the Etablissement
        restEtablissementMockMvc.perform(post("/api/etablissements")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(etablissement)))
            .andExpect(status().isCreated());

        // Validate the Etablissement in the database
        List<Etablissement> etablissementList = etablissementRepository.findAll();
        assertThat(etablissementList).hasSize(databaseSizeBeforeCreate + 1);
        Etablissement testEtablissement = etablissementList.get(etablissementList.size() - 1);
        assertThat(testEtablissement.getNomEcole()).isEqualTo(DEFAULT_NOM_ECOLE);
        assertThat(testEtablissement.getAdresse()).isEqualTo(DEFAULT_ADRESSE);
        assertThat(testEtablissement.getRc()).isEqualTo(DEFAULT_RC);
        assertThat(testEtablissement.getIce()).isEqualTo(DEFAULT_ICE);
        assertThat(testEtablissement.getTp()).isEqualTo(DEFAULT_TP);
        assertThat(testEtablissement.getIdentiteFiche()).isEqualTo(DEFAULT_IDENTITE_FICHE);
        assertThat(testEtablissement.getLogo()).isEqualTo(DEFAULT_LOGO);
        assertThat(testEtablissement.getLogoContentType()).isEqualTo(DEFAULT_LOGO_CONTENT_TYPE);

        // Validate the Etablissement in Elasticsearch
        verify(mockEtablissementSearchRepository, times(1)).save(testEtablissement);
    }

    @Test
    @Transactional
    public void createEtablissementWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = etablissementRepository.findAll().size();

        // Create the Etablissement with an existing ID
        etablissement.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEtablissementMockMvc.perform(post("/api/etablissements")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(etablissement)))
            .andExpect(status().isBadRequest());

        // Validate the Etablissement in the database
        List<Etablissement> etablissementList = etablissementRepository.findAll();
        assertThat(etablissementList).hasSize(databaseSizeBeforeCreate);

        // Validate the Etablissement in Elasticsearch
        verify(mockEtablissementSearchRepository, times(0)).save(etablissement);
    }


    @Test
    @Transactional
    public void getAllEtablissements() throws Exception {
        // Initialize the database
        etablissementRepository.saveAndFlush(etablissement);

        // Get all the etablissementList
        restEtablissementMockMvc.perform(get("/api/etablissements?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(etablissement.getId().intValue())))
            .andExpect(jsonPath("$.[*].nomEcole").value(hasItem(DEFAULT_NOM_ECOLE.toString())))
            .andExpect(jsonPath("$.[*].adresse").value(hasItem(DEFAULT_ADRESSE.toString())))
            .andExpect(jsonPath("$.[*].rc").value(hasItem(DEFAULT_RC.toString())))
            .andExpect(jsonPath("$.[*].ice").value(hasItem(DEFAULT_ICE.toString())))
            .andExpect(jsonPath("$.[*].tp").value(hasItem(DEFAULT_TP.toString())))
            .andExpect(jsonPath("$.[*].identiteFiche").value(hasItem(DEFAULT_IDENTITE_FICHE.toString())))
            .andExpect(jsonPath("$.[*].logoContentType").value(hasItem(DEFAULT_LOGO_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].logo").value(hasItem(Base64Utils.encodeToString(DEFAULT_LOGO))));
    }
    
    @Test
    @Transactional
    public void getEtablissement() throws Exception {
        // Initialize the database
        etablissementRepository.saveAndFlush(etablissement);

        // Get the etablissement
        restEtablissementMockMvc.perform(get("/api/etablissements/{id}", etablissement.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(etablissement.getId().intValue()))
            .andExpect(jsonPath("$.nomEcole").value(DEFAULT_NOM_ECOLE.toString()))
            .andExpect(jsonPath("$.adresse").value(DEFAULT_ADRESSE.toString()))
            .andExpect(jsonPath("$.rc").value(DEFAULT_RC.toString()))
            .andExpect(jsonPath("$.ice").value(DEFAULT_ICE.toString()))
            .andExpect(jsonPath("$.tp").value(DEFAULT_TP.toString()))
            .andExpect(jsonPath("$.identiteFiche").value(DEFAULT_IDENTITE_FICHE.toString()))
            .andExpect(jsonPath("$.logoContentType").value(DEFAULT_LOGO_CONTENT_TYPE))
            .andExpect(jsonPath("$.logo").value(Base64Utils.encodeToString(DEFAULT_LOGO)));
    }

    @Test
    @Transactional
    public void getNonExistingEtablissement() throws Exception {
        // Get the etablissement
        restEtablissementMockMvc.perform(get("/api/etablissements/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEtablissement() throws Exception {
        // Initialize the database
        etablissementRepository.saveAndFlush(etablissement);

        int databaseSizeBeforeUpdate = etablissementRepository.findAll().size();

        // Update the etablissement
        Etablissement updatedEtablissement = etablissementRepository.findById(etablissement.getId()).get();
        // Disconnect from session so that the updates on updatedEtablissement are not directly saved in db
        em.detach(updatedEtablissement);
        updatedEtablissement
            .nomEcole(UPDATED_NOM_ECOLE)
            .adresse(UPDATED_ADRESSE)
            .rc(UPDATED_RC)
            .ice(UPDATED_ICE)
            .tp(UPDATED_TP)
            .identiteFiche(UPDATED_IDENTITE_FICHE)
            .logo(UPDATED_LOGO)
            .logoContentType(UPDATED_LOGO_CONTENT_TYPE);

        restEtablissementMockMvc.perform(put("/api/etablissements")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEtablissement)))
            .andExpect(status().isOk());

        // Validate the Etablissement in the database
        List<Etablissement> etablissementList = etablissementRepository.findAll();
        assertThat(etablissementList).hasSize(databaseSizeBeforeUpdate);
        Etablissement testEtablissement = etablissementList.get(etablissementList.size() - 1);
        assertThat(testEtablissement.getNomEcole()).isEqualTo(UPDATED_NOM_ECOLE);
        assertThat(testEtablissement.getAdresse()).isEqualTo(UPDATED_ADRESSE);
        assertThat(testEtablissement.getRc()).isEqualTo(UPDATED_RC);
        assertThat(testEtablissement.getIce()).isEqualTo(UPDATED_ICE);
        assertThat(testEtablissement.getTp()).isEqualTo(UPDATED_TP);
        assertThat(testEtablissement.getIdentiteFiche()).isEqualTo(UPDATED_IDENTITE_FICHE);
        assertThat(testEtablissement.getLogo()).isEqualTo(UPDATED_LOGO);
        assertThat(testEtablissement.getLogoContentType()).isEqualTo(UPDATED_LOGO_CONTENT_TYPE);

        // Validate the Etablissement in Elasticsearch
        verify(mockEtablissementSearchRepository, times(1)).save(testEtablissement);
    }

    @Test
    @Transactional
    public void updateNonExistingEtablissement() throws Exception {
        int databaseSizeBeforeUpdate = etablissementRepository.findAll().size();

        // Create the Etablissement

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEtablissementMockMvc.perform(put("/api/etablissements")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(etablissement)))
            .andExpect(status().isBadRequest());

        // Validate the Etablissement in the database
        List<Etablissement> etablissementList = etablissementRepository.findAll();
        assertThat(etablissementList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Etablissement in Elasticsearch
        verify(mockEtablissementSearchRepository, times(0)).save(etablissement);
    }

    @Test
    @Transactional
    public void deleteEtablissement() throws Exception {
        // Initialize the database
        etablissementRepository.saveAndFlush(etablissement);

        int databaseSizeBeforeDelete = etablissementRepository.findAll().size();

        // Delete the etablissement
        restEtablissementMockMvc.perform(delete("/api/etablissements/{id}", etablissement.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Etablissement> etablissementList = etablissementRepository.findAll();
        assertThat(etablissementList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Etablissement in Elasticsearch
        verify(mockEtablissementSearchRepository, times(1)).deleteById(etablissement.getId());
    }

    @Test
    @Transactional
    public void searchEtablissement() throws Exception {
        // Initialize the database
        etablissementRepository.saveAndFlush(etablissement);
        when(mockEtablissementSearchRepository.search(queryStringQuery("id:" + etablissement.getId())))
            .thenReturn(Collections.singletonList(etablissement));
        // Search the etablissement
        restEtablissementMockMvc.perform(get("/api/_search/etablissements?query=id:" + etablissement.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(etablissement.getId().intValue())))
            .andExpect(jsonPath("$.[*].nomEcole").value(hasItem(DEFAULT_NOM_ECOLE)))
            .andExpect(jsonPath("$.[*].adresse").value(hasItem(DEFAULT_ADRESSE)))
            .andExpect(jsonPath("$.[*].rc").value(hasItem(DEFAULT_RC)))
            .andExpect(jsonPath("$.[*].ice").value(hasItem(DEFAULT_ICE)))
            .andExpect(jsonPath("$.[*].tp").value(hasItem(DEFAULT_TP)))
            .andExpect(jsonPath("$.[*].identiteFiche").value(hasItem(DEFAULT_IDENTITE_FICHE)))
            .andExpect(jsonPath("$.[*].logoContentType").value(hasItem(DEFAULT_LOGO_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].logo").value(hasItem(Base64Utils.encodeToString(DEFAULT_LOGO))));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Etablissement.class);
        Etablissement etablissement1 = new Etablissement();
        etablissement1.setId(1L);
        Etablissement etablissement2 = new Etablissement();
        etablissement2.setId(etablissement1.getId());
        assertThat(etablissement1).isEqualTo(etablissement2);
        etablissement2.setId(2L);
        assertThat(etablissement1).isNotEqualTo(etablissement2);
        etablissement1.setId(null);
        assertThat(etablissement1).isNotEqualTo(etablissement2);
    }
}
