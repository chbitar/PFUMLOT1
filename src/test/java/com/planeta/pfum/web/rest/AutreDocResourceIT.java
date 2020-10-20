package com.planeta.pfum.web.rest;

import com.planeta.pfum.Pfumv10App;
import com.planeta.pfum.domain.AutreDoc;
import com.planeta.pfum.repository.AutreDocRepository;
import com.planeta.pfum.repository.search.AutreDocSearchRepository;
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
 * Integration tests for the {@Link AutreDocResource} REST controller.
 */
@SpringBootTest(classes = Pfumv10App.class)
public class AutreDocResourceIT {

    private static final String DEFAULT_TITRE = "AAAAAAAAAA";
    private static final String UPDATED_TITRE = "BBBBBBBBBB";

    private static final byte[] DEFAULT_DATA = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_DATA = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_DATA_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_DATA_CONTENT_TYPE = "image/png";

    @Autowired
    private AutreDocRepository autreDocRepository;

    /**
     * This repository is mocked in the com.planeta.pfum.repository.search test package.
     *
     * @see com.planeta.pfum.repository.search.AutreDocSearchRepositoryMockConfiguration
     */
    @Autowired
    private AutreDocSearchRepository mockAutreDocSearchRepository;

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

    private MockMvc restAutreDocMockMvc;

    private AutreDoc autreDoc;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AutreDocResource autreDocResource = new AutreDocResource(autreDocRepository, mockAutreDocSearchRepository);
        this.restAutreDocMockMvc = MockMvcBuilders.standaloneSetup(autreDocResource)
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
    public static AutreDoc createEntity(EntityManager em) {
        AutreDoc autreDoc = new AutreDoc()
            .titre(DEFAULT_TITRE)
            .data(DEFAULT_DATA)
            .dataContentType(DEFAULT_DATA_CONTENT_TYPE);
        return autreDoc;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AutreDoc createUpdatedEntity(EntityManager em) {
        AutreDoc autreDoc = new AutreDoc()
            .titre(UPDATED_TITRE)
            .data(UPDATED_DATA)
            .dataContentType(UPDATED_DATA_CONTENT_TYPE);
        return autreDoc;
    }

    @BeforeEach
    public void initTest() {
        autreDoc = createEntity(em);
    }

    @Test
    @Transactional
    public void createAutreDoc() throws Exception {
        int databaseSizeBeforeCreate = autreDocRepository.findAll().size();

        // Create the AutreDoc
        restAutreDocMockMvc.perform(post("/api/autre-docs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(autreDoc)))
            .andExpect(status().isCreated());

        // Validate the AutreDoc in the database
        List<AutreDoc> autreDocList = autreDocRepository.findAll();
        assertThat(autreDocList).hasSize(databaseSizeBeforeCreate + 1);
        AutreDoc testAutreDoc = autreDocList.get(autreDocList.size() - 1);
        assertThat(testAutreDoc.getTitre()).isEqualTo(DEFAULT_TITRE);
        assertThat(testAutreDoc.getData()).isEqualTo(DEFAULT_DATA);
        assertThat(testAutreDoc.getDataContentType()).isEqualTo(DEFAULT_DATA_CONTENT_TYPE);

        // Validate the AutreDoc in Elasticsearch
        verify(mockAutreDocSearchRepository, times(1)).save(testAutreDoc);
    }

    @Test
    @Transactional
    public void createAutreDocWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = autreDocRepository.findAll().size();

        // Create the AutreDoc with an existing ID
        autreDoc.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAutreDocMockMvc.perform(post("/api/autre-docs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(autreDoc)))
            .andExpect(status().isBadRequest());

        // Validate the AutreDoc in the database
        List<AutreDoc> autreDocList = autreDocRepository.findAll();
        assertThat(autreDocList).hasSize(databaseSizeBeforeCreate);

        // Validate the AutreDoc in Elasticsearch
        verify(mockAutreDocSearchRepository, times(0)).save(autreDoc);
    }


    @Test
    @Transactional
    public void getAllAutreDocs() throws Exception {
        // Initialize the database
        autreDocRepository.saveAndFlush(autreDoc);

        // Get all the autreDocList
        restAutreDocMockMvc.perform(get("/api/autre-docs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(autreDoc.getId().intValue())))
            .andExpect(jsonPath("$.[*].titre").value(hasItem(DEFAULT_TITRE.toString())))
            .andExpect(jsonPath("$.[*].dataContentType").value(hasItem(DEFAULT_DATA_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].data").value(hasItem(Base64Utils.encodeToString(DEFAULT_DATA))));
    }
    
    @Test
    @Transactional
    public void getAutreDoc() throws Exception {
        // Initialize the database
        autreDocRepository.saveAndFlush(autreDoc);

        // Get the autreDoc
        restAutreDocMockMvc.perform(get("/api/autre-docs/{id}", autreDoc.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(autreDoc.getId().intValue()))
            .andExpect(jsonPath("$.titre").value(DEFAULT_TITRE.toString()))
            .andExpect(jsonPath("$.dataContentType").value(DEFAULT_DATA_CONTENT_TYPE))
            .andExpect(jsonPath("$.data").value(Base64Utils.encodeToString(DEFAULT_DATA)));
    }

    @Test
    @Transactional
    public void getNonExistingAutreDoc() throws Exception {
        // Get the autreDoc
        restAutreDocMockMvc.perform(get("/api/autre-docs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAutreDoc() throws Exception {
        // Initialize the database
        autreDocRepository.saveAndFlush(autreDoc);

        int databaseSizeBeforeUpdate = autreDocRepository.findAll().size();

        // Update the autreDoc
        AutreDoc updatedAutreDoc = autreDocRepository.findById(autreDoc.getId()).get();
        // Disconnect from session so that the updates on updatedAutreDoc are not directly saved in db
        em.detach(updatedAutreDoc);
        updatedAutreDoc
            .titre(UPDATED_TITRE)
            .data(UPDATED_DATA)
            .dataContentType(UPDATED_DATA_CONTENT_TYPE);

        restAutreDocMockMvc.perform(put("/api/autre-docs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAutreDoc)))
            .andExpect(status().isOk());

        // Validate the AutreDoc in the database
        List<AutreDoc> autreDocList = autreDocRepository.findAll();
        assertThat(autreDocList).hasSize(databaseSizeBeforeUpdate);
        AutreDoc testAutreDoc = autreDocList.get(autreDocList.size() - 1);
        assertThat(testAutreDoc.getTitre()).isEqualTo(UPDATED_TITRE);
        assertThat(testAutreDoc.getData()).isEqualTo(UPDATED_DATA);
        assertThat(testAutreDoc.getDataContentType()).isEqualTo(UPDATED_DATA_CONTENT_TYPE);

        // Validate the AutreDoc in Elasticsearch
        verify(mockAutreDocSearchRepository, times(1)).save(testAutreDoc);
    }

    @Test
    @Transactional
    public void updateNonExistingAutreDoc() throws Exception {
        int databaseSizeBeforeUpdate = autreDocRepository.findAll().size();

        // Create the AutreDoc

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAutreDocMockMvc.perform(put("/api/autre-docs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(autreDoc)))
            .andExpect(status().isBadRequest());

        // Validate the AutreDoc in the database
        List<AutreDoc> autreDocList = autreDocRepository.findAll();
        assertThat(autreDocList).hasSize(databaseSizeBeforeUpdate);

        // Validate the AutreDoc in Elasticsearch
        verify(mockAutreDocSearchRepository, times(0)).save(autreDoc);
    }

    @Test
    @Transactional
    public void deleteAutreDoc() throws Exception {
        // Initialize the database
        autreDocRepository.saveAndFlush(autreDoc);

        int databaseSizeBeforeDelete = autreDocRepository.findAll().size();

        // Delete the autreDoc
        restAutreDocMockMvc.perform(delete("/api/autre-docs/{id}", autreDoc.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<AutreDoc> autreDocList = autreDocRepository.findAll();
        assertThat(autreDocList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the AutreDoc in Elasticsearch
        verify(mockAutreDocSearchRepository, times(1)).deleteById(autreDoc.getId());
    }

    @Test
    @Transactional
    public void searchAutreDoc() throws Exception {
        // Initialize the database
        autreDocRepository.saveAndFlush(autreDoc);
        when(mockAutreDocSearchRepository.search(queryStringQuery("id:" + autreDoc.getId())))
            .thenReturn(Collections.singletonList(autreDoc));
        // Search the autreDoc
        restAutreDocMockMvc.perform(get("/api/_search/autre-docs?query=id:" + autreDoc.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(autreDoc.getId().intValue())))
            .andExpect(jsonPath("$.[*].titre").value(hasItem(DEFAULT_TITRE)))
            .andExpect(jsonPath("$.[*].dataContentType").value(hasItem(DEFAULT_DATA_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].data").value(hasItem(Base64Utils.encodeToString(DEFAULT_DATA))));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AutreDoc.class);
        AutreDoc autreDoc1 = new AutreDoc();
        autreDoc1.setId(1L);
        AutreDoc autreDoc2 = new AutreDoc();
        autreDoc2.setId(autreDoc1.getId());
        assertThat(autreDoc1).isEqualTo(autreDoc2);
        autreDoc2.setId(2L);
        assertThat(autreDoc1).isNotEqualTo(autreDoc2);
        autreDoc1.setId(null);
        assertThat(autreDoc1).isNotEqualTo(autreDoc2);
    }
}
