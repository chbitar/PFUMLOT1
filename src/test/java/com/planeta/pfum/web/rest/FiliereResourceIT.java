package com.planeta.pfum.web.rest;

import com.planeta.pfum.Pfumv10App;
import com.planeta.pfum.domain.Filiere;
import com.planeta.pfum.repository.FiliereRepository;
import com.planeta.pfum.repository.search.FiliereSearchRepository;
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

import com.planeta.pfum.domain.enumeration.Programme;
/**
 * Integration tests for the {@Link FiliereResource} REST controller.
 */
@SpringBootTest(classes = Pfumv10App.class)
public class FiliereResourceIT {

    private static final String DEFAULT_NOMFILIERE = "AAAAAAAAAA";
    private static final String UPDATED_NOMFILIERE = "BBBBBBBBBB";

    private static final String DEFAULT_RESPONSABLE = "AAAAAAAAAA";
    private static final String UPDATED_RESPONSABLE = "BBBBBBBBBB";

    private static final String DEFAULT_ACCREDITAION = "AAAAAAAAAA";
    private static final String UPDATED_ACCREDITAION = "BBBBBBBBBB";

    private static final Programme DEFAULT_PROGRAMME = Programme.LICENCE;
    private static final Programme UPDATED_PROGRAMME = Programme.MASTER;

    @Autowired
    private FiliereRepository filiereRepository;

    /**
     * This repository is mocked in the com.planeta.pfum.repository.search test package.
     *
     * @see com.planeta.pfum.repository.search.FiliereSearchRepositoryMockConfiguration
     */
    @Autowired
    private FiliereSearchRepository mockFiliereSearchRepository;

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

    private MockMvc restFiliereMockMvc;

    private Filiere filiere;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final FiliereResource filiereResource = new FiliereResource(filiereRepository, mockFiliereSearchRepository);
        this.restFiliereMockMvc = MockMvcBuilders.standaloneSetup(filiereResource)
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
    public static Filiere createEntity(EntityManager em) {
        Filiere filiere = new Filiere()
            .nomfiliere(DEFAULT_NOMFILIERE)
            .responsable(DEFAULT_RESPONSABLE)
            .accreditaion(DEFAULT_ACCREDITAION)
            .programme(DEFAULT_PROGRAMME);
        return filiere;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Filiere createUpdatedEntity(EntityManager em) {
        Filiere filiere = new Filiere()
            .nomfiliere(UPDATED_NOMFILIERE)
            .responsable(UPDATED_RESPONSABLE)
            .accreditaion(UPDATED_ACCREDITAION)
            .programme(UPDATED_PROGRAMME);
        return filiere;
    }

    @BeforeEach
    public void initTest() {
        filiere = createEntity(em);
    }

    @Test
    @Transactional
    public void createFiliere() throws Exception {
        int databaseSizeBeforeCreate = filiereRepository.findAll().size();

        // Create the Filiere
        restFiliereMockMvc.perform(post("/api/filieres")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(filiere)))
            .andExpect(status().isCreated());

        // Validate the Filiere in the database
        List<Filiere> filiereList = filiereRepository.findAll();
        assertThat(filiereList).hasSize(databaseSizeBeforeCreate + 1);
        Filiere testFiliere = filiereList.get(filiereList.size() - 1);
        assertThat(testFiliere.getNomfiliere()).isEqualTo(DEFAULT_NOMFILIERE);
        assertThat(testFiliere.getResponsable()).isEqualTo(DEFAULT_RESPONSABLE);
        assertThat(testFiliere.getAccreditaion()).isEqualTo(DEFAULT_ACCREDITAION);
        assertThat(testFiliere.getProgramme()).isEqualTo(DEFAULT_PROGRAMME);

        // Validate the Filiere in Elasticsearch
        verify(mockFiliereSearchRepository, times(1)).save(testFiliere);
    }

    @Test
    @Transactional
    public void createFiliereWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = filiereRepository.findAll().size();

        // Create the Filiere with an existing ID
        filiere.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFiliereMockMvc.perform(post("/api/filieres")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(filiere)))
            .andExpect(status().isBadRequest());

        // Validate the Filiere in the database
        List<Filiere> filiereList = filiereRepository.findAll();
        assertThat(filiereList).hasSize(databaseSizeBeforeCreate);

        // Validate the Filiere in Elasticsearch
        verify(mockFiliereSearchRepository, times(0)).save(filiere);
    }


    @Test
    @Transactional
    public void getAllFilieres() throws Exception {
        // Initialize the database
        filiereRepository.saveAndFlush(filiere);

        // Get all the filiereList
        restFiliereMockMvc.perform(get("/api/filieres?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(filiere.getId().intValue())))
            .andExpect(jsonPath("$.[*].nomfiliere").value(hasItem(DEFAULT_NOMFILIERE.toString())))
            .andExpect(jsonPath("$.[*].responsable").value(hasItem(DEFAULT_RESPONSABLE.toString())))
            .andExpect(jsonPath("$.[*].accreditaion").value(hasItem(DEFAULT_ACCREDITAION.toString())))
            .andExpect(jsonPath("$.[*].programme").value(hasItem(DEFAULT_PROGRAMME.toString())));
    }
    
    @Test
    @Transactional
    public void getFiliere() throws Exception {
        // Initialize the database
        filiereRepository.saveAndFlush(filiere);

        // Get the filiere
        restFiliereMockMvc.perform(get("/api/filieres/{id}", filiere.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(filiere.getId().intValue()))
            .andExpect(jsonPath("$.nomfiliere").value(DEFAULT_NOMFILIERE.toString()))
            .andExpect(jsonPath("$.responsable").value(DEFAULT_RESPONSABLE.toString()))
            .andExpect(jsonPath("$.accreditaion").value(DEFAULT_ACCREDITAION.toString()))
            .andExpect(jsonPath("$.programme").value(DEFAULT_PROGRAMME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingFiliere() throws Exception {
        // Get the filiere
        restFiliereMockMvc.perform(get("/api/filieres/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFiliere() throws Exception {
        // Initialize the database
        filiereRepository.saveAndFlush(filiere);

        int databaseSizeBeforeUpdate = filiereRepository.findAll().size();

        // Update the filiere
        Filiere updatedFiliere = filiereRepository.findById(filiere.getId()).get();
        // Disconnect from session so that the updates on updatedFiliere are not directly saved in db
        em.detach(updatedFiliere);
        updatedFiliere
            .nomfiliere(UPDATED_NOMFILIERE)
            .responsable(UPDATED_RESPONSABLE)
            .accreditaion(UPDATED_ACCREDITAION)
            .programme(UPDATED_PROGRAMME);

        restFiliereMockMvc.perform(put("/api/filieres")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedFiliere)))
            .andExpect(status().isOk());

        // Validate the Filiere in the database
        List<Filiere> filiereList = filiereRepository.findAll();
        assertThat(filiereList).hasSize(databaseSizeBeforeUpdate);
        Filiere testFiliere = filiereList.get(filiereList.size() - 1);
        assertThat(testFiliere.getNomfiliere()).isEqualTo(UPDATED_NOMFILIERE);
        assertThat(testFiliere.getResponsable()).isEqualTo(UPDATED_RESPONSABLE);
        assertThat(testFiliere.getAccreditaion()).isEqualTo(UPDATED_ACCREDITAION);
        assertThat(testFiliere.getProgramme()).isEqualTo(UPDATED_PROGRAMME);

        // Validate the Filiere in Elasticsearch
        verify(mockFiliereSearchRepository, times(1)).save(testFiliere);
    }

    @Test
    @Transactional
    public void updateNonExistingFiliere() throws Exception {
        int databaseSizeBeforeUpdate = filiereRepository.findAll().size();

        // Create the Filiere

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFiliereMockMvc.perform(put("/api/filieres")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(filiere)))
            .andExpect(status().isBadRequest());

        // Validate the Filiere in the database
        List<Filiere> filiereList = filiereRepository.findAll();
        assertThat(filiereList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Filiere in Elasticsearch
        verify(mockFiliereSearchRepository, times(0)).save(filiere);
    }

    @Test
    @Transactional
    public void deleteFiliere() throws Exception {
        // Initialize the database
        filiereRepository.saveAndFlush(filiere);

        int databaseSizeBeforeDelete = filiereRepository.findAll().size();

        // Delete the filiere
        restFiliereMockMvc.perform(delete("/api/filieres/{id}", filiere.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Filiere> filiereList = filiereRepository.findAll();
        assertThat(filiereList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Filiere in Elasticsearch
        verify(mockFiliereSearchRepository, times(1)).deleteById(filiere.getId());
    }

    @Test
    @Transactional
    public void searchFiliere() throws Exception {
        // Initialize the database
        filiereRepository.saveAndFlush(filiere);
        when(mockFiliereSearchRepository.search(queryStringQuery("id:" + filiere.getId())))
            .thenReturn(Collections.singletonList(filiere));
        // Search the filiere
        restFiliereMockMvc.perform(get("/api/_search/filieres?query=id:" + filiere.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(filiere.getId().intValue())))
            .andExpect(jsonPath("$.[*].nomfiliere").value(hasItem(DEFAULT_NOMFILIERE)))
            .andExpect(jsonPath("$.[*].responsable").value(hasItem(DEFAULT_RESPONSABLE)))
            .andExpect(jsonPath("$.[*].accreditaion").value(hasItem(DEFAULT_ACCREDITAION)))
            .andExpect(jsonPath("$.[*].programme").value(hasItem(DEFAULT_PROGRAMME.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Filiere.class);
        Filiere filiere1 = new Filiere();
        filiere1.setId(1L);
        Filiere filiere2 = new Filiere();
        filiere2.setId(filiere1.getId());
        assertThat(filiere1).isEqualTo(filiere2);
        filiere2.setId(2L);
        assertThat(filiere1).isNotEqualTo(filiere2);
        filiere1.setId(null);
        assertThat(filiere1).isNotEqualTo(filiere2);
    }
}
