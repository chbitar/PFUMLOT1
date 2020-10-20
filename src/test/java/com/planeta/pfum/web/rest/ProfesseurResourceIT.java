package com.planeta.pfum.web.rest;

import com.planeta.pfum.Pfumv10App;
import com.planeta.pfum.domain.Professeur;
import com.planeta.pfum.repository.ProfesseurRepository;
import com.planeta.pfum.repository.search.ProfesseurSearchRepository;
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
 * Integration tests for the {@Link ProfesseurResource} REST controller.
 */
@SpringBootTest(classes = Pfumv10App.class)
public class ProfesseurResourceIT {

    private static final String DEFAULT_NOM = "AAAAAAAAAA";
    private static final String UPDATED_NOM = "BBBBBBBBBB";

    private static final String DEFAULT_PRENOM = "AAAAAAAAAA";
    private static final String UPDATED_PRENOM = "BBBBBBBBBB";

    private static final String DEFAULT_ETABLISSEMENT = "AAAAAAAAAA";
    private static final String UPDATED_ETABLISSEMENT = "BBBBBBBBBB";

    private static final String DEFAULT_GRADE = "AAAAAAAAAA";
    private static final String UPDATED_GRADE = "BBBBBBBBBB";

    private static final String DEFAULT_DIPLOME = "AAAAAAAAAA";
    private static final String UPDATED_DIPLOME = "BBBBBBBBBB";

    private static final String DEFAULT_CIN = "AAAAAAAAAA";
    private static final String UPDATED_CIN = "BBBBBBBBBB";

    private static final String DEFAULT_RIB = "AAAAAAAAAA";
    private static final String UPDATED_RIB = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    @Autowired
    private ProfesseurRepository professeurRepository;

    /**
     * This repository is mocked in the com.planeta.pfum.repository.search test package.
     *
     * @see com.planeta.pfum.repository.search.ProfesseurSearchRepositoryMockConfiguration
     */
    @Autowired
    private ProfesseurSearchRepository mockProfesseurSearchRepository;

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

    private MockMvc restProfesseurMockMvc;

    private Professeur professeur;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ProfesseurResource professeurResource = new ProfesseurResource(professeurRepository, mockProfesseurSearchRepository);
        this.restProfesseurMockMvc = MockMvcBuilders.standaloneSetup(professeurResource)
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
    public static Professeur createEntity(EntityManager em) {
        Professeur professeur = new Professeur()
            .nom(DEFAULT_NOM)
            .prenom(DEFAULT_PRENOM)
            .etablissement(DEFAULT_ETABLISSEMENT)
            .grade(DEFAULT_GRADE)
            .diplome(DEFAULT_DIPLOME)
            .cin(DEFAULT_CIN)
            .rib(DEFAULT_RIB)
            .email(DEFAULT_EMAIL);
        return professeur;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Professeur createUpdatedEntity(EntityManager em) {
        Professeur professeur = new Professeur()
            .nom(UPDATED_NOM)
            .prenom(UPDATED_PRENOM)
            .etablissement(UPDATED_ETABLISSEMENT)
            .grade(UPDATED_GRADE)
            .diplome(UPDATED_DIPLOME)
            .cin(UPDATED_CIN)
            .rib(UPDATED_RIB)
            .email(UPDATED_EMAIL);
        return professeur;
    }

    @BeforeEach
    public void initTest() {
        professeur = createEntity(em);
    }

    @Test
    @Transactional
    public void createProfesseur() throws Exception {
        int databaseSizeBeforeCreate = professeurRepository.findAll().size();

        // Create the Professeur
        restProfesseurMockMvc.perform(post("/api/professeurs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(professeur)))
            .andExpect(status().isCreated());

        // Validate the Professeur in the database
        List<Professeur> professeurList = professeurRepository.findAll();
        assertThat(professeurList).hasSize(databaseSizeBeforeCreate + 1);
        Professeur testProfesseur = professeurList.get(professeurList.size() - 1);
        assertThat(testProfesseur.getNom()).isEqualTo(DEFAULT_NOM);
        assertThat(testProfesseur.getPrenom()).isEqualTo(DEFAULT_PRENOM);
        assertThat(testProfesseur.getEtablissement()).isEqualTo(DEFAULT_ETABLISSEMENT);
        assertThat(testProfesseur.getGrade()).isEqualTo(DEFAULT_GRADE);
        assertThat(testProfesseur.getDiplome()).isEqualTo(DEFAULT_DIPLOME);
        assertThat(testProfesseur.getCin()).isEqualTo(DEFAULT_CIN);
        assertThat(testProfesseur.getRib()).isEqualTo(DEFAULT_RIB);
        assertThat(testProfesseur.getEmail()).isEqualTo(DEFAULT_EMAIL);

        // Validate the Professeur in Elasticsearch
        verify(mockProfesseurSearchRepository, times(1)).save(testProfesseur);
    }

    @Test
    @Transactional
    public void createProfesseurWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = professeurRepository.findAll().size();

        // Create the Professeur with an existing ID
        professeur.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProfesseurMockMvc.perform(post("/api/professeurs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(professeur)))
            .andExpect(status().isBadRequest());

        // Validate the Professeur in the database
        List<Professeur> professeurList = professeurRepository.findAll();
        assertThat(professeurList).hasSize(databaseSizeBeforeCreate);

        // Validate the Professeur in Elasticsearch
        verify(mockProfesseurSearchRepository, times(0)).save(professeur);
    }


    @Test
    @Transactional
    public void getAllProfesseurs() throws Exception {
        // Initialize the database
        professeurRepository.saveAndFlush(professeur);

        // Get all the professeurList
        restProfesseurMockMvc.perform(get("/api/professeurs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(professeur.getId().intValue())))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM.toString())))
            .andExpect(jsonPath("$.[*].prenom").value(hasItem(DEFAULT_PRENOM.toString())))
            .andExpect(jsonPath("$.[*].etablissement").value(hasItem(DEFAULT_ETABLISSEMENT.toString())))
            .andExpect(jsonPath("$.[*].grade").value(hasItem(DEFAULT_GRADE.toString())))
            .andExpect(jsonPath("$.[*].diplome").value(hasItem(DEFAULT_DIPLOME.toString())))
            .andExpect(jsonPath("$.[*].cin").value(hasItem(DEFAULT_CIN.toString())))
            .andExpect(jsonPath("$.[*].rib").value(hasItem(DEFAULT_RIB.toString())))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL.toString())));
    }
    
    @Test
    @Transactional
    public void getProfesseur() throws Exception {
        // Initialize the database
        professeurRepository.saveAndFlush(professeur);

        // Get the professeur
        restProfesseurMockMvc.perform(get("/api/professeurs/{id}", professeur.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(professeur.getId().intValue()))
            .andExpect(jsonPath("$.nom").value(DEFAULT_NOM.toString()))
            .andExpect(jsonPath("$.prenom").value(DEFAULT_PRENOM.toString()))
            .andExpect(jsonPath("$.etablissement").value(DEFAULT_ETABLISSEMENT.toString()))
            .andExpect(jsonPath("$.grade").value(DEFAULT_GRADE.toString()))
            .andExpect(jsonPath("$.diplome").value(DEFAULT_DIPLOME.toString()))
            .andExpect(jsonPath("$.cin").value(DEFAULT_CIN.toString()))
            .andExpect(jsonPath("$.rib").value(DEFAULT_RIB.toString()))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingProfesseur() throws Exception {
        // Get the professeur
        restProfesseurMockMvc.perform(get("/api/professeurs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProfesseur() throws Exception {
        // Initialize the database
        professeurRepository.saveAndFlush(professeur);

        int databaseSizeBeforeUpdate = professeurRepository.findAll().size();

        // Update the professeur
        Professeur updatedProfesseur = professeurRepository.findById(professeur.getId()).get();
        // Disconnect from session so that the updates on updatedProfesseur are not directly saved in db
        em.detach(updatedProfesseur);
        updatedProfesseur
            .nom(UPDATED_NOM)
            .prenom(UPDATED_PRENOM)
            .etablissement(UPDATED_ETABLISSEMENT)
            .grade(UPDATED_GRADE)
            .diplome(UPDATED_DIPLOME)
            .cin(UPDATED_CIN)
            .rib(UPDATED_RIB)
            .email(UPDATED_EMAIL);

        restProfesseurMockMvc.perform(put("/api/professeurs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedProfesseur)))
            .andExpect(status().isOk());

        // Validate the Professeur in the database
        List<Professeur> professeurList = professeurRepository.findAll();
        assertThat(professeurList).hasSize(databaseSizeBeforeUpdate);
        Professeur testProfesseur = professeurList.get(professeurList.size() - 1);
        assertThat(testProfesseur.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testProfesseur.getPrenom()).isEqualTo(UPDATED_PRENOM);
        assertThat(testProfesseur.getEtablissement()).isEqualTo(UPDATED_ETABLISSEMENT);
        assertThat(testProfesseur.getGrade()).isEqualTo(UPDATED_GRADE);
        assertThat(testProfesseur.getDiplome()).isEqualTo(UPDATED_DIPLOME);
        assertThat(testProfesseur.getCin()).isEqualTo(UPDATED_CIN);
        assertThat(testProfesseur.getRib()).isEqualTo(UPDATED_RIB);
        assertThat(testProfesseur.getEmail()).isEqualTo(UPDATED_EMAIL);

        // Validate the Professeur in Elasticsearch
        verify(mockProfesseurSearchRepository, times(1)).save(testProfesseur);
    }

    @Test
    @Transactional
    public void updateNonExistingProfesseur() throws Exception {
        int databaseSizeBeforeUpdate = professeurRepository.findAll().size();

        // Create the Professeur

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProfesseurMockMvc.perform(put("/api/professeurs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(professeur)))
            .andExpect(status().isBadRequest());

        // Validate the Professeur in the database
        List<Professeur> professeurList = professeurRepository.findAll();
        assertThat(professeurList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Professeur in Elasticsearch
        verify(mockProfesseurSearchRepository, times(0)).save(professeur);
    }

    @Test
    @Transactional
    public void deleteProfesseur() throws Exception {
        // Initialize the database
        professeurRepository.saveAndFlush(professeur);

        int databaseSizeBeforeDelete = professeurRepository.findAll().size();

        // Delete the professeur
        restProfesseurMockMvc.perform(delete("/api/professeurs/{id}", professeur.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Professeur> professeurList = professeurRepository.findAll();
        assertThat(professeurList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Professeur in Elasticsearch
        verify(mockProfesseurSearchRepository, times(1)).deleteById(professeur.getId());
    }

    @Test
    @Transactional
    public void searchProfesseur() throws Exception {
        // Initialize the database
        professeurRepository.saveAndFlush(professeur);
        when(mockProfesseurSearchRepository.search(queryStringQuery("id:" + professeur.getId())))
            .thenReturn(Collections.singletonList(professeur));
        // Search the professeur
        restProfesseurMockMvc.perform(get("/api/_search/professeurs?query=id:" + professeur.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(professeur.getId().intValue())))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM)))
            .andExpect(jsonPath("$.[*].prenom").value(hasItem(DEFAULT_PRENOM)))
            .andExpect(jsonPath("$.[*].etablissement").value(hasItem(DEFAULT_ETABLISSEMENT)))
            .andExpect(jsonPath("$.[*].grade").value(hasItem(DEFAULT_GRADE)))
            .andExpect(jsonPath("$.[*].diplome").value(hasItem(DEFAULT_DIPLOME)))
            .andExpect(jsonPath("$.[*].cin").value(hasItem(DEFAULT_CIN)))
            .andExpect(jsonPath("$.[*].rib").value(hasItem(DEFAULT_RIB)))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL)));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Professeur.class);
        Professeur professeur1 = new Professeur();
        professeur1.setId(1L);
        Professeur professeur2 = new Professeur();
        professeur2.setId(professeur1.getId());
        assertThat(professeur1).isEqualTo(professeur2);
        professeur2.setId(2L);
        assertThat(professeur1).isNotEqualTo(professeur2);
        professeur1.setId(null);
        assertThat(professeur1).isNotEqualTo(professeur2);
    }
}
