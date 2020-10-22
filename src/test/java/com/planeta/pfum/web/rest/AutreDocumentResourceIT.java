package com.planeta.pfum.web.rest;

import static com.planeta.pfum.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.List;

import javax.persistence.EntityManager;

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

import com.planeta.pfum.PfumApp;
import com.planeta.pfum.domain.AutreDocument;
import com.planeta.pfum.repository.AutreDocumentRepository;
import com.planeta.pfum.web.rest.errors.ExceptionTranslator;

/**
 * Integration tests for the {@Link AutreDocumentResource} REST controller.
 */
@SpringBootTest(classes = PfumApp.class)
public class AutreDocumentResourceIT {

    private static final String DEFAULT_TITRE = "AAAAAAAAAA";
    private static final String UPDATED_TITRE = "BBBBBBBBBB";

    private static final byte[] DEFAULT_DATA = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_DATA = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_DATA_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_DATA_CONTENT_TYPE = "image/png";

    @Autowired
    private AutreDocumentRepository autreDocumentRepository;

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

    private MockMvc restAutreDocumentMockMvc;

    private AutreDocument autreDocument;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AutreDocumentResource autreDocumentResource = new AutreDocumentResource(autreDocumentRepository);
        this.restAutreDocumentMockMvc = MockMvcBuilders.standaloneSetup(autreDocumentResource)
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
    public static AutreDocument createEntity(EntityManager em) {
        AutreDocument autreDocument = new AutreDocument()
            .titre(DEFAULT_TITRE)
            .data(DEFAULT_DATA)
            .dataContentType(DEFAULT_DATA_CONTENT_TYPE);
        return autreDocument;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AutreDocument createUpdatedEntity(EntityManager em) {
        AutreDocument autreDocument = new AutreDocument()
            .titre(UPDATED_TITRE)
            .data(UPDATED_DATA)
            .dataContentType(UPDATED_DATA_CONTENT_TYPE);
        return autreDocument;
    }

    @BeforeEach
    public void initTest() {
        autreDocument = createEntity(em);
    }

    @Test
    @Transactional
    public void createAutreDocument() throws Exception {
        int databaseSizeBeforeCreate = autreDocumentRepository.findAll().size();

        // Create the AutreDocument
        restAutreDocumentMockMvc.perform(post("/api/autre-documents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(autreDocument)))
            .andExpect(status().isCreated());

        // Validate the AutreDocument in the database
        List<AutreDocument> autreDocumentList = autreDocumentRepository.findAll();
        assertThat(autreDocumentList).hasSize(databaseSizeBeforeCreate + 1);
        AutreDocument testAutreDocument = autreDocumentList.get(autreDocumentList.size() - 1);
        assertThat(testAutreDocument.getTitre()).isEqualTo(DEFAULT_TITRE);
        assertThat(testAutreDocument.getData()).isEqualTo(DEFAULT_DATA);
        assertThat(testAutreDocument.getDataContentType()).isEqualTo(DEFAULT_DATA_CONTENT_TYPE);
    }

    @Test
    @Transactional
    public void createAutreDocumentWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = autreDocumentRepository.findAll().size();

        // Create the AutreDocument with an existing ID
        autreDocument.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAutreDocumentMockMvc.perform(post("/api/autre-documents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(autreDocument)))
            .andExpect(status().isBadRequest());

        // Validate the AutreDocument in the database
        List<AutreDocument> autreDocumentList = autreDocumentRepository.findAll();
        assertThat(autreDocumentList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllAutreDocuments() throws Exception {
        // Initialize the database
        autreDocumentRepository.saveAndFlush(autreDocument);

        // Get all the autreDocumentList
        restAutreDocumentMockMvc.perform(get("/api/autre-documents?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(autreDocument.getId().intValue())))
            .andExpect(jsonPath("$.[*].titre").value(hasItem(DEFAULT_TITRE.toString())))
            .andExpect(jsonPath("$.[*].dataContentType").value(hasItem(DEFAULT_DATA_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].data").value(hasItem(Base64Utils.encodeToString(DEFAULT_DATA))));
    }
    
    @Test
    @Transactional
    public void getAutreDocument() throws Exception {
        // Initialize the database
        autreDocumentRepository.saveAndFlush(autreDocument);

        // Get the autreDocument
        restAutreDocumentMockMvc.perform(get("/api/autre-documents/{id}", autreDocument.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(autreDocument.getId().intValue()))
            .andExpect(jsonPath("$.titre").value(DEFAULT_TITRE.toString()))
            .andExpect(jsonPath("$.dataContentType").value(DEFAULT_DATA_CONTENT_TYPE))
            .andExpect(jsonPath("$.data").value(Base64Utils.encodeToString(DEFAULT_DATA)));
    }

    @Test
    @Transactional
    public void getNonExistingAutreDocument() throws Exception {
        // Get the autreDocument
        restAutreDocumentMockMvc.perform(get("/api/autre-documents/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAutreDocument() throws Exception {
        // Initialize the database
        autreDocumentRepository.saveAndFlush(autreDocument);

        int databaseSizeBeforeUpdate = autreDocumentRepository.findAll().size();

        // Update the autreDocument
        AutreDocument updatedAutreDocument = autreDocumentRepository.findById(autreDocument.getId()).get();
        // Disconnect from session so that the updates on updatedAutreDocument are not directly saved in db
        em.detach(updatedAutreDocument);
        updatedAutreDocument
            .titre(UPDATED_TITRE)
            .data(UPDATED_DATA)
            .dataContentType(UPDATED_DATA_CONTENT_TYPE);

        restAutreDocumentMockMvc.perform(put("/api/autre-documents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAutreDocument)))
            .andExpect(status().isOk());

        // Validate the AutreDocument in the database
        List<AutreDocument> autreDocumentList = autreDocumentRepository.findAll();
        assertThat(autreDocumentList).hasSize(databaseSizeBeforeUpdate);
        AutreDocument testAutreDocument = autreDocumentList.get(autreDocumentList.size() - 1);
        assertThat(testAutreDocument.getTitre()).isEqualTo(UPDATED_TITRE);
        assertThat(testAutreDocument.getData()).isEqualTo(UPDATED_DATA);
        assertThat(testAutreDocument.getDataContentType()).isEqualTo(UPDATED_DATA_CONTENT_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingAutreDocument() throws Exception {
        int databaseSizeBeforeUpdate = autreDocumentRepository.findAll().size();

        // Create the AutreDocument

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAutreDocumentMockMvc.perform(put("/api/autre-documents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(autreDocument)))
            .andExpect(status().isBadRequest());

        // Validate the AutreDocument in the database
        List<AutreDocument> autreDocumentList = autreDocumentRepository.findAll();
        assertThat(autreDocumentList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAutreDocument() throws Exception {
        // Initialize the database
        autreDocumentRepository.saveAndFlush(autreDocument);

        int databaseSizeBeforeDelete = autreDocumentRepository.findAll().size();

        // Delete the autreDocument
        restAutreDocumentMockMvc.perform(delete("/api/autre-documents/{id}", autreDocument.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<AutreDocument> autreDocumentList = autreDocumentRepository.findAll();
        assertThat(autreDocumentList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AutreDocument.class);
        AutreDocument autreDocument1 = new AutreDocument();
        autreDocument1.setId(1L);
        AutreDocument autreDocument2 = new AutreDocument();
        autreDocument2.setId(autreDocument1.getId());
        assertThat(autreDocument1).isEqualTo(autreDocument2);
        autreDocument2.setId(2L);
        assertThat(autreDocument1).isNotEqualTo(autreDocument2);
        autreDocument1.setId(null);
        assertThat(autreDocument1).isNotEqualTo(autreDocument2);
    }
}
