package com.planeta.pfum.web.rest;

import com.planeta.pfum.Pfumv10App;
import com.planeta.pfum.domain.EtudiantsLicence;
import com.planeta.pfum.repository.EtudiantsLicenceRepository;
import com.planeta.pfum.repository.search.EtudiantsLicenceSearchRepository;
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

import com.planeta.pfum.domain.enumeration.DiplomeBac;
import com.planeta.pfum.domain.enumeration.Mention;
/**
 * Integration tests for the {@Link EtudiantsLicenceResource} REST controller.
 */
@SpringBootTest(classes = Pfumv10App.class)
public class EtudiantsLicenceResourceIT {

    private static final String DEFAULT_SUFFIXE = "AAAAAAAAAA";
    private static final String UPDATED_SUFFIXE = "BBBBBBBBBB";

    private static final String DEFAULT_NOM = "AAAAAAAAAA";
    private static final String UPDATED_NOM = "BBBBBBBBBB";

    private static final String DEFAULT_PRENOM = "AAAAAAAAAA";
    private static final String UPDATED_PRENOM = "BBBBBBBBBB";

    private static final Instant DEFAULT_DATE_NAISSANCE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE_NAISSANCE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_ADRESSE_CONTACT = "AAAAAAAAAA";
    private static final String UPDATED_ADRESSE_CONTACT = "BBBBBBBBBB";

    private static final String DEFAULT_VILLE = "AAAAAAAAAA";
    private static final String UPDATED_VILLE = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    private static final DiplomeBac DEFAULT_PJ_BAC = DiplomeBac.Sciences_De_La_Vie_Et_De_La_Terre;
    private static final DiplomeBac UPDATED_PJ_BAC = DiplomeBac.Sciences_Physiques_Et_Chimiques;

    private static final Mention DEFAULT_MENTION = Mention.Passable;
    private static final Mention UPDATED_MENTION = Mention.Assez_bien;

    private static final String DEFAULT_ANNE_OTENTION = "AAAAAAAAAA";
    private static final String UPDATED_ANNE_OTENTION = "BBBBBBBBBB";

    private static final String DEFAULT_CIN_PASS = "AAAAAAAAAA";
    private static final String UPDATED_CIN_PASS = "BBBBBBBBBB";

    private static final String DEFAULT_PAYS_NATIONALITE = "AAAAAAAAAA";
    private static final String UPDATED_PAYS_NATIONALITE = "BBBBBBBBBB";

    private static final String DEFAULT_PAYS_RESIDENCE = "AAAAAAAAAA";
    private static final String UPDATED_PAYS_RESIDENCE = "BBBBBBBBBB";

    private static final String DEFAULT_CODEPOSTAL = "AAAAAAAAAA";
    private static final String UPDATED_CODEPOSTAL = "BBBBBBBBBB";

    private static final String DEFAULT_PROVINCE = "AAAAAAAAAA";
    private static final String UPDATED_PROVINCE = "BBBBBBBBBB";

    private static final Integer DEFAULT_TEL = 1;
    private static final Integer UPDATED_TEL = 2;

    private static final Integer DEFAULT_DEUXIEME_TEL = 1;
    private static final Integer UPDATED_DEUXIEME_TEL = 2;

    private static final byte[] DEFAULT_PHOTO = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_PHOTO = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_PHOTO_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_PHOTO_CONTENT_TYPE = "image/png";

    private static final byte[] DEFAULT_EXTRAIT_ACTE_NAISSANCE = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_EXTRAIT_ACTE_NAISSANCE = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_EXTRAIT_ACTE_NAISSANCE_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_EXTRAIT_ACTE_NAISSANCE_CONTENT_TYPE = "image/png";

    private static final byte[] DEFAULT_BACALAUREAT = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_BACALAUREAT = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_BACALAUREAT_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_BACALAUREAT_CONTENT_TYPE = "image/png";

    private static final byte[] DEFAULT_CIN_PASSPORT = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_CIN_PASSPORT = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_CIN_PASSPORT_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_CIN_PASSPORT_CONTENT_TYPE = "image/png";

    private static final Boolean DEFAULT_INSCRIPTIONVALIDE = false;
    private static final Boolean UPDATED_INSCRIPTIONVALIDE = true;

    private static final Boolean DEFAULT_ABSENT = false;
    private static final Boolean UPDATED_ABSENT = true;

    @Autowired
    private EtudiantsLicenceRepository etudiantsLicenceRepository;

    /**
     * This repository is mocked in the com.planeta.pfum.repository.search test package.
     *
     * @see com.planeta.pfum.repository.search.EtudiantsLicenceSearchRepositoryMockConfiguration
     */
    @Autowired
    private EtudiantsLicenceSearchRepository mockEtudiantsLicenceSearchRepository;

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

    private MockMvc restEtudiantsLicenceMockMvc;

    private EtudiantsLicence etudiantsLicence;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EtudiantsLicenceResource etudiantsLicenceResource = new EtudiantsLicenceResource(etudiantsLicenceRepository, mockEtudiantsLicenceSearchRepository);
        this.restEtudiantsLicenceMockMvc = MockMvcBuilders.standaloneSetup(etudiantsLicenceResource)
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
    public static EtudiantsLicence createEntity(EntityManager em) {
        EtudiantsLicence etudiantsLicence = new EtudiantsLicence()
            .suffixe(DEFAULT_SUFFIXE)
            .nom(DEFAULT_NOM)
            .prenom(DEFAULT_PRENOM)
            .dateNaissance(DEFAULT_DATE_NAISSANCE)
            .adresseContact(DEFAULT_ADRESSE_CONTACT)
            .ville(DEFAULT_VILLE)
            .email(DEFAULT_EMAIL)
            .pjBac(DEFAULT_PJ_BAC)
            .mention(DEFAULT_MENTION)
            .anneOtention(DEFAULT_ANNE_OTENTION)
            .cinPass(DEFAULT_CIN_PASS)
            .paysNationalite(DEFAULT_PAYS_NATIONALITE)
            .paysResidence(DEFAULT_PAYS_RESIDENCE)
            .codepostal(DEFAULT_CODEPOSTAL)
            .province(DEFAULT_PROVINCE)
            .tel(DEFAULT_TEL)
            .deuxiemeTel(DEFAULT_DEUXIEME_TEL)
            .photo(DEFAULT_PHOTO)
            .photoContentType(DEFAULT_PHOTO_CONTENT_TYPE)
            .extraitActeNaissance(DEFAULT_EXTRAIT_ACTE_NAISSANCE)
            .extraitActeNaissanceContentType(DEFAULT_EXTRAIT_ACTE_NAISSANCE_CONTENT_TYPE)
            .bacalaureat(DEFAULT_BACALAUREAT)
            .bacalaureatContentType(DEFAULT_BACALAUREAT_CONTENT_TYPE)
            .cinPassport(DEFAULT_CIN_PASSPORT)
            .cinPassportContentType(DEFAULT_CIN_PASSPORT_CONTENT_TYPE)
            .inscriptionvalide(DEFAULT_INSCRIPTIONVALIDE)
            .absent(DEFAULT_ABSENT);
        return etudiantsLicence;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static EtudiantsLicence createUpdatedEntity(EntityManager em) {
        EtudiantsLicence etudiantsLicence = new EtudiantsLicence()
            .suffixe(UPDATED_SUFFIXE)
            .nom(UPDATED_NOM)
            .prenom(UPDATED_PRENOM)
            .dateNaissance(UPDATED_DATE_NAISSANCE)
            .adresseContact(UPDATED_ADRESSE_CONTACT)
            .ville(UPDATED_VILLE)
            .email(UPDATED_EMAIL)
            .pjBac(UPDATED_PJ_BAC)
            .mention(UPDATED_MENTION)
            .anneOtention(UPDATED_ANNE_OTENTION)
            .cinPass(UPDATED_CIN_PASS)
            .paysNationalite(UPDATED_PAYS_NATIONALITE)
            .paysResidence(UPDATED_PAYS_RESIDENCE)
            .codepostal(UPDATED_CODEPOSTAL)
            .province(UPDATED_PROVINCE)
            .tel(UPDATED_TEL)
            .deuxiemeTel(UPDATED_DEUXIEME_TEL)
            .photo(UPDATED_PHOTO)
            .photoContentType(UPDATED_PHOTO_CONTENT_TYPE)
            .extraitActeNaissance(UPDATED_EXTRAIT_ACTE_NAISSANCE)
            .extraitActeNaissanceContentType(UPDATED_EXTRAIT_ACTE_NAISSANCE_CONTENT_TYPE)
            .bacalaureat(UPDATED_BACALAUREAT)
            .bacalaureatContentType(UPDATED_BACALAUREAT_CONTENT_TYPE)
            .cinPassport(UPDATED_CIN_PASSPORT)
            .cinPassportContentType(UPDATED_CIN_PASSPORT_CONTENT_TYPE)
            .inscriptionvalide(UPDATED_INSCRIPTIONVALIDE)
            .absent(UPDATED_ABSENT);
        return etudiantsLicence;
    }

    @BeforeEach
    public void initTest() {
        etudiantsLicence = createEntity(em);
    }

    @Test
    @Transactional
    public void createEtudiantsLicence() throws Exception {
        int databaseSizeBeforeCreate = etudiantsLicenceRepository.findAll().size();

        // Create the EtudiantsLicence
        restEtudiantsLicenceMockMvc.perform(post("/api/etudiants-licences")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(etudiantsLicence)))
            .andExpect(status().isCreated());

        // Validate the EtudiantsLicence in the database
        List<EtudiantsLicence> etudiantsLicenceList = etudiantsLicenceRepository.findAll();
        assertThat(etudiantsLicenceList).hasSize(databaseSizeBeforeCreate + 1);
        EtudiantsLicence testEtudiantsLicence = etudiantsLicenceList.get(etudiantsLicenceList.size() - 1);
        assertThat(testEtudiantsLicence.getSuffixe()).isEqualTo(DEFAULT_SUFFIXE);
        assertThat(testEtudiantsLicence.getNom()).isEqualTo(DEFAULT_NOM);
        assertThat(testEtudiantsLicence.getPrenom()).isEqualTo(DEFAULT_PRENOM);
        assertThat(testEtudiantsLicence.getDateNaissance()).isEqualTo(DEFAULT_DATE_NAISSANCE);
        assertThat(testEtudiantsLicence.getAdresseContact()).isEqualTo(DEFAULT_ADRESSE_CONTACT);
        assertThat(testEtudiantsLicence.getVille()).isEqualTo(DEFAULT_VILLE);
        assertThat(testEtudiantsLicence.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testEtudiantsLicence.getPjBac()).isEqualTo(DEFAULT_PJ_BAC);
        assertThat(testEtudiantsLicence.getMention()).isEqualTo(DEFAULT_MENTION);
        assertThat(testEtudiantsLicence.getAnneOtention()).isEqualTo(DEFAULT_ANNE_OTENTION);
        assertThat(testEtudiantsLicence.getCinPass()).isEqualTo(DEFAULT_CIN_PASS);
        assertThat(testEtudiantsLicence.getPaysNationalite()).isEqualTo(DEFAULT_PAYS_NATIONALITE);
        assertThat(testEtudiantsLicence.getPaysResidence()).isEqualTo(DEFAULT_PAYS_RESIDENCE);
        assertThat(testEtudiantsLicence.getCodepostal()).isEqualTo(DEFAULT_CODEPOSTAL);
        assertThat(testEtudiantsLicence.getProvince()).isEqualTo(DEFAULT_PROVINCE);
        assertThat(testEtudiantsLicence.getTel()).isEqualTo(DEFAULT_TEL);
        assertThat(testEtudiantsLicence.getDeuxiemeTel()).isEqualTo(DEFAULT_DEUXIEME_TEL);
        assertThat(testEtudiantsLicence.getPhoto()).isEqualTo(DEFAULT_PHOTO);
        assertThat(testEtudiantsLicence.getPhotoContentType()).isEqualTo(DEFAULT_PHOTO_CONTENT_TYPE);
        assertThat(testEtudiantsLicence.getExtraitActeNaissance()).isEqualTo(DEFAULT_EXTRAIT_ACTE_NAISSANCE);
        assertThat(testEtudiantsLicence.getExtraitActeNaissanceContentType()).isEqualTo(DEFAULT_EXTRAIT_ACTE_NAISSANCE_CONTENT_TYPE);
        assertThat(testEtudiantsLicence.getBacalaureat()).isEqualTo(DEFAULT_BACALAUREAT);
        assertThat(testEtudiantsLicence.getBacalaureatContentType()).isEqualTo(DEFAULT_BACALAUREAT_CONTENT_TYPE);
        assertThat(testEtudiantsLicence.getCinPassport()).isEqualTo(DEFAULT_CIN_PASSPORT);
        assertThat(testEtudiantsLicence.getCinPassportContentType()).isEqualTo(DEFAULT_CIN_PASSPORT_CONTENT_TYPE);
        assertThat(testEtudiantsLicence.isInscriptionvalide()).isEqualTo(DEFAULT_INSCRIPTIONVALIDE);
        assertThat(testEtudiantsLicence.isAbsent()).isEqualTo(DEFAULT_ABSENT);

        // Validate the EtudiantsLicence in Elasticsearch
        verify(mockEtudiantsLicenceSearchRepository, times(1)).save(testEtudiantsLicence);
    }

    @Test
    @Transactional
    public void createEtudiantsLicenceWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = etudiantsLicenceRepository.findAll().size();

        // Create the EtudiantsLicence with an existing ID
        etudiantsLicence.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEtudiantsLicenceMockMvc.perform(post("/api/etudiants-licences")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(etudiantsLicence)))
            .andExpect(status().isBadRequest());

        // Validate the EtudiantsLicence in the database
        List<EtudiantsLicence> etudiantsLicenceList = etudiantsLicenceRepository.findAll();
        assertThat(etudiantsLicenceList).hasSize(databaseSizeBeforeCreate);

        // Validate the EtudiantsLicence in Elasticsearch
        verify(mockEtudiantsLicenceSearchRepository, times(0)).save(etudiantsLicence);
    }


    @Test
    @Transactional
    public void checkNomIsRequired() throws Exception {
        int databaseSizeBeforeTest = etudiantsLicenceRepository.findAll().size();
        // set the field null
        etudiantsLicence.setNom(null);

        // Create the EtudiantsLicence, which fails.

        restEtudiantsLicenceMockMvc.perform(post("/api/etudiants-licences")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(etudiantsLicence)))
            .andExpect(status().isBadRequest());

        List<EtudiantsLicence> etudiantsLicenceList = etudiantsLicenceRepository.findAll();
        assertThat(etudiantsLicenceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPrenomIsRequired() throws Exception {
        int databaseSizeBeforeTest = etudiantsLicenceRepository.findAll().size();
        // set the field null
        etudiantsLicence.setPrenom(null);

        // Create the EtudiantsLicence, which fails.

        restEtudiantsLicenceMockMvc.perform(post("/api/etudiants-licences")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(etudiantsLicence)))
            .andExpect(status().isBadRequest());

        List<EtudiantsLicence> etudiantsLicenceList = etudiantsLicenceRepository.findAll();
        assertThat(etudiantsLicenceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDateNaissanceIsRequired() throws Exception {
        int databaseSizeBeforeTest = etudiantsLicenceRepository.findAll().size();
        // set the field null
        etudiantsLicence.setDateNaissance(null);

        // Create the EtudiantsLicence, which fails.

        restEtudiantsLicenceMockMvc.perform(post("/api/etudiants-licences")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(etudiantsLicence)))
            .andExpect(status().isBadRequest());

        List<EtudiantsLicence> etudiantsLicenceList = etudiantsLicenceRepository.findAll();
        assertThat(etudiantsLicenceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkAdresseContactIsRequired() throws Exception {
        int databaseSizeBeforeTest = etudiantsLicenceRepository.findAll().size();
        // set the field null
        etudiantsLicence.setAdresseContact(null);

        // Create the EtudiantsLicence, which fails.

        restEtudiantsLicenceMockMvc.perform(post("/api/etudiants-licences")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(etudiantsLicence)))
            .andExpect(status().isBadRequest());

        List<EtudiantsLicence> etudiantsLicenceList = etudiantsLicenceRepository.findAll();
        assertThat(etudiantsLicenceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkEmailIsRequired() throws Exception {
        int databaseSizeBeforeTest = etudiantsLicenceRepository.findAll().size();
        // set the field null
        etudiantsLicence.setEmail(null);

        // Create the EtudiantsLicence, which fails.

        restEtudiantsLicenceMockMvc.perform(post("/api/etudiants-licences")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(etudiantsLicence)))
            .andExpect(status().isBadRequest());

        List<EtudiantsLicence> etudiantsLicenceList = etudiantsLicenceRepository.findAll();
        assertThat(etudiantsLicenceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCinPassIsRequired() throws Exception {
        int databaseSizeBeforeTest = etudiantsLicenceRepository.findAll().size();
        // set the field null
        etudiantsLicence.setCinPass(null);

        // Create the EtudiantsLicence, which fails.

        restEtudiantsLicenceMockMvc.perform(post("/api/etudiants-licences")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(etudiantsLicence)))
            .andExpect(status().isBadRequest());

        List<EtudiantsLicence> etudiantsLicenceList = etudiantsLicenceRepository.findAll();
        assertThat(etudiantsLicenceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllEtudiantsLicences() throws Exception {
        // Initialize the database
        etudiantsLicenceRepository.saveAndFlush(etudiantsLicence);

        // Get all the etudiantsLicenceList
        restEtudiantsLicenceMockMvc.perform(get("/api/etudiants-licences?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(etudiantsLicence.getId().intValue())))
            .andExpect(jsonPath("$.[*].suffixe").value(hasItem(DEFAULT_SUFFIXE.toString())))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM.toString())))
            .andExpect(jsonPath("$.[*].prenom").value(hasItem(DEFAULT_PRENOM.toString())))
            .andExpect(jsonPath("$.[*].dateNaissance").value(hasItem(DEFAULT_DATE_NAISSANCE.toString())))
            .andExpect(jsonPath("$.[*].adresseContact").value(hasItem(DEFAULT_ADRESSE_CONTACT.toString())))
            .andExpect(jsonPath("$.[*].ville").value(hasItem(DEFAULT_VILLE.toString())))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL.toString())))
            .andExpect(jsonPath("$.[*].pjBac").value(hasItem(DEFAULT_PJ_BAC.toString())))
            .andExpect(jsonPath("$.[*].mention").value(hasItem(DEFAULT_MENTION.toString())))
            .andExpect(jsonPath("$.[*].anneOtention").value(hasItem(DEFAULT_ANNE_OTENTION.toString())))
            .andExpect(jsonPath("$.[*].cinPass").value(hasItem(DEFAULT_CIN_PASS.toString())))
            .andExpect(jsonPath("$.[*].paysNationalite").value(hasItem(DEFAULT_PAYS_NATIONALITE.toString())))
            .andExpect(jsonPath("$.[*].paysResidence").value(hasItem(DEFAULT_PAYS_RESIDENCE.toString())))
            .andExpect(jsonPath("$.[*].codepostal").value(hasItem(DEFAULT_CODEPOSTAL.toString())))
            .andExpect(jsonPath("$.[*].province").value(hasItem(DEFAULT_PROVINCE.toString())))
            .andExpect(jsonPath("$.[*].tel").value(hasItem(DEFAULT_TEL)))
            .andExpect(jsonPath("$.[*].deuxiemeTel").value(hasItem(DEFAULT_DEUXIEME_TEL)))
            .andExpect(jsonPath("$.[*].photoContentType").value(hasItem(DEFAULT_PHOTO_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].photo").value(hasItem(Base64Utils.encodeToString(DEFAULT_PHOTO))))
            .andExpect(jsonPath("$.[*].extraitActeNaissanceContentType").value(hasItem(DEFAULT_EXTRAIT_ACTE_NAISSANCE_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].extraitActeNaissance").value(hasItem(Base64Utils.encodeToString(DEFAULT_EXTRAIT_ACTE_NAISSANCE))))
            .andExpect(jsonPath("$.[*].bacalaureatContentType").value(hasItem(DEFAULT_BACALAUREAT_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].bacalaureat").value(hasItem(Base64Utils.encodeToString(DEFAULT_BACALAUREAT))))
            .andExpect(jsonPath("$.[*].cinPassportContentType").value(hasItem(DEFAULT_CIN_PASSPORT_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].cinPassport").value(hasItem(Base64Utils.encodeToString(DEFAULT_CIN_PASSPORT))))
            .andExpect(jsonPath("$.[*].inscriptionvalide").value(hasItem(DEFAULT_INSCRIPTIONVALIDE.booleanValue())))
            .andExpect(jsonPath("$.[*].absent").value(hasItem(DEFAULT_ABSENT.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getEtudiantsLicence() throws Exception {
        // Initialize the database
        etudiantsLicenceRepository.saveAndFlush(etudiantsLicence);

        // Get the etudiantsLicence
        restEtudiantsLicenceMockMvc.perform(get("/api/etudiants-licences/{id}", etudiantsLicence.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(etudiantsLicence.getId().intValue()))
            .andExpect(jsonPath("$.suffixe").value(DEFAULT_SUFFIXE.toString()))
            .andExpect(jsonPath("$.nom").value(DEFAULT_NOM.toString()))
            .andExpect(jsonPath("$.prenom").value(DEFAULT_PRENOM.toString()))
            .andExpect(jsonPath("$.dateNaissance").value(DEFAULT_DATE_NAISSANCE.toString()))
            .andExpect(jsonPath("$.adresseContact").value(DEFAULT_ADRESSE_CONTACT.toString()))
            .andExpect(jsonPath("$.ville").value(DEFAULT_VILLE.toString()))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL.toString()))
            .andExpect(jsonPath("$.pjBac").value(DEFAULT_PJ_BAC.toString()))
            .andExpect(jsonPath("$.mention").value(DEFAULT_MENTION.toString()))
            .andExpect(jsonPath("$.anneOtention").value(DEFAULT_ANNE_OTENTION.toString()))
            .andExpect(jsonPath("$.cinPass").value(DEFAULT_CIN_PASS.toString()))
            .andExpect(jsonPath("$.paysNationalite").value(DEFAULT_PAYS_NATIONALITE.toString()))
            .andExpect(jsonPath("$.paysResidence").value(DEFAULT_PAYS_RESIDENCE.toString()))
            .andExpect(jsonPath("$.codepostal").value(DEFAULT_CODEPOSTAL.toString()))
            .andExpect(jsonPath("$.province").value(DEFAULT_PROVINCE.toString()))
            .andExpect(jsonPath("$.tel").value(DEFAULT_TEL))
            .andExpect(jsonPath("$.deuxiemeTel").value(DEFAULT_DEUXIEME_TEL))
            .andExpect(jsonPath("$.photoContentType").value(DEFAULT_PHOTO_CONTENT_TYPE))
            .andExpect(jsonPath("$.photo").value(Base64Utils.encodeToString(DEFAULT_PHOTO)))
            .andExpect(jsonPath("$.extraitActeNaissanceContentType").value(DEFAULT_EXTRAIT_ACTE_NAISSANCE_CONTENT_TYPE))
            .andExpect(jsonPath("$.extraitActeNaissance").value(Base64Utils.encodeToString(DEFAULT_EXTRAIT_ACTE_NAISSANCE)))
            .andExpect(jsonPath("$.bacalaureatContentType").value(DEFAULT_BACALAUREAT_CONTENT_TYPE))
            .andExpect(jsonPath("$.bacalaureat").value(Base64Utils.encodeToString(DEFAULT_BACALAUREAT)))
            .andExpect(jsonPath("$.cinPassportContentType").value(DEFAULT_CIN_PASSPORT_CONTENT_TYPE))
            .andExpect(jsonPath("$.cinPassport").value(Base64Utils.encodeToString(DEFAULT_CIN_PASSPORT)))
            .andExpect(jsonPath("$.inscriptionvalide").value(DEFAULT_INSCRIPTIONVALIDE.booleanValue()))
            .andExpect(jsonPath("$.absent").value(DEFAULT_ABSENT.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingEtudiantsLicence() throws Exception {
        // Get the etudiantsLicence
        restEtudiantsLicenceMockMvc.perform(get("/api/etudiants-licences/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEtudiantsLicence() throws Exception {
        // Initialize the database
        etudiantsLicenceRepository.saveAndFlush(etudiantsLicence);

        int databaseSizeBeforeUpdate = etudiantsLicenceRepository.findAll().size();

        // Update the etudiantsLicence
        EtudiantsLicence updatedEtudiantsLicence = etudiantsLicenceRepository.findById(etudiantsLicence.getId()).get();
        // Disconnect from session so that the updates on updatedEtudiantsLicence are not directly saved in db
        em.detach(updatedEtudiantsLicence);
        updatedEtudiantsLicence
            .suffixe(UPDATED_SUFFIXE)
            .nom(UPDATED_NOM)
            .prenom(UPDATED_PRENOM)
            .dateNaissance(UPDATED_DATE_NAISSANCE)
            .adresseContact(UPDATED_ADRESSE_CONTACT)
            .ville(UPDATED_VILLE)
            .email(UPDATED_EMAIL)
            .pjBac(UPDATED_PJ_BAC)
            .mention(UPDATED_MENTION)
            .anneOtention(UPDATED_ANNE_OTENTION)
            .cinPass(UPDATED_CIN_PASS)
            .paysNationalite(UPDATED_PAYS_NATIONALITE)
            .paysResidence(UPDATED_PAYS_RESIDENCE)
            .codepostal(UPDATED_CODEPOSTAL)
            .province(UPDATED_PROVINCE)
            .tel(UPDATED_TEL)
            .deuxiemeTel(UPDATED_DEUXIEME_TEL)
            .photo(UPDATED_PHOTO)
            .photoContentType(UPDATED_PHOTO_CONTENT_TYPE)
            .extraitActeNaissance(UPDATED_EXTRAIT_ACTE_NAISSANCE)
            .extraitActeNaissanceContentType(UPDATED_EXTRAIT_ACTE_NAISSANCE_CONTENT_TYPE)
            .bacalaureat(UPDATED_BACALAUREAT)
            .bacalaureatContentType(UPDATED_BACALAUREAT_CONTENT_TYPE)
            .cinPassport(UPDATED_CIN_PASSPORT)
            .cinPassportContentType(UPDATED_CIN_PASSPORT_CONTENT_TYPE)
            .inscriptionvalide(UPDATED_INSCRIPTIONVALIDE)
            .absent(UPDATED_ABSENT);

        restEtudiantsLicenceMockMvc.perform(put("/api/etudiants-licences")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEtudiantsLicence)))
            .andExpect(status().isOk());

        // Validate the EtudiantsLicence in the database
        List<EtudiantsLicence> etudiantsLicenceList = etudiantsLicenceRepository.findAll();
        assertThat(etudiantsLicenceList).hasSize(databaseSizeBeforeUpdate);
        EtudiantsLicence testEtudiantsLicence = etudiantsLicenceList.get(etudiantsLicenceList.size() - 1);
        assertThat(testEtudiantsLicence.getSuffixe()).isEqualTo(UPDATED_SUFFIXE);
        assertThat(testEtudiantsLicence.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testEtudiantsLicence.getPrenom()).isEqualTo(UPDATED_PRENOM);
        assertThat(testEtudiantsLicence.getDateNaissance()).isEqualTo(UPDATED_DATE_NAISSANCE);
        assertThat(testEtudiantsLicence.getAdresseContact()).isEqualTo(UPDATED_ADRESSE_CONTACT);
        assertThat(testEtudiantsLicence.getVille()).isEqualTo(UPDATED_VILLE);
        assertThat(testEtudiantsLicence.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testEtudiantsLicence.getPjBac()).isEqualTo(UPDATED_PJ_BAC);
        assertThat(testEtudiantsLicence.getMention()).isEqualTo(UPDATED_MENTION);
        assertThat(testEtudiantsLicence.getAnneOtention()).isEqualTo(UPDATED_ANNE_OTENTION);
        assertThat(testEtudiantsLicence.getCinPass()).isEqualTo(UPDATED_CIN_PASS);
        assertThat(testEtudiantsLicence.getPaysNationalite()).isEqualTo(UPDATED_PAYS_NATIONALITE);
        assertThat(testEtudiantsLicence.getPaysResidence()).isEqualTo(UPDATED_PAYS_RESIDENCE);
        assertThat(testEtudiantsLicence.getCodepostal()).isEqualTo(UPDATED_CODEPOSTAL);
        assertThat(testEtudiantsLicence.getProvince()).isEqualTo(UPDATED_PROVINCE);
        assertThat(testEtudiantsLicence.getTel()).isEqualTo(UPDATED_TEL);
        assertThat(testEtudiantsLicence.getDeuxiemeTel()).isEqualTo(UPDATED_DEUXIEME_TEL);
        assertThat(testEtudiantsLicence.getPhoto()).isEqualTo(UPDATED_PHOTO);
        assertThat(testEtudiantsLicence.getPhotoContentType()).isEqualTo(UPDATED_PHOTO_CONTENT_TYPE);
        assertThat(testEtudiantsLicence.getExtraitActeNaissance()).isEqualTo(UPDATED_EXTRAIT_ACTE_NAISSANCE);
        assertThat(testEtudiantsLicence.getExtraitActeNaissanceContentType()).isEqualTo(UPDATED_EXTRAIT_ACTE_NAISSANCE_CONTENT_TYPE);
        assertThat(testEtudiantsLicence.getBacalaureat()).isEqualTo(UPDATED_BACALAUREAT);
        assertThat(testEtudiantsLicence.getBacalaureatContentType()).isEqualTo(UPDATED_BACALAUREAT_CONTENT_TYPE);
        assertThat(testEtudiantsLicence.getCinPassport()).isEqualTo(UPDATED_CIN_PASSPORT);
        assertThat(testEtudiantsLicence.getCinPassportContentType()).isEqualTo(UPDATED_CIN_PASSPORT_CONTENT_TYPE);
        assertThat(testEtudiantsLicence.isInscriptionvalide()).isEqualTo(UPDATED_INSCRIPTIONVALIDE);
        assertThat(testEtudiantsLicence.isAbsent()).isEqualTo(UPDATED_ABSENT);

        // Validate the EtudiantsLicence in Elasticsearch
        verify(mockEtudiantsLicenceSearchRepository, times(1)).save(testEtudiantsLicence);
    }

    @Test
    @Transactional
    public void updateNonExistingEtudiantsLicence() throws Exception {
        int databaseSizeBeforeUpdate = etudiantsLicenceRepository.findAll().size();

        // Create the EtudiantsLicence

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEtudiantsLicenceMockMvc.perform(put("/api/etudiants-licences")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(etudiantsLicence)))
            .andExpect(status().isBadRequest());

        // Validate the EtudiantsLicence in the database
        List<EtudiantsLicence> etudiantsLicenceList = etudiantsLicenceRepository.findAll();
        assertThat(etudiantsLicenceList).hasSize(databaseSizeBeforeUpdate);

        // Validate the EtudiantsLicence in Elasticsearch
        verify(mockEtudiantsLicenceSearchRepository, times(0)).save(etudiantsLicence);
    }

    @Test
    @Transactional
    public void deleteEtudiantsLicence() throws Exception {
        // Initialize the database
        etudiantsLicenceRepository.saveAndFlush(etudiantsLicence);

        int databaseSizeBeforeDelete = etudiantsLicenceRepository.findAll().size();

        // Delete the etudiantsLicence
        restEtudiantsLicenceMockMvc.perform(delete("/api/etudiants-licences/{id}", etudiantsLicence.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<EtudiantsLicence> etudiantsLicenceList = etudiantsLicenceRepository.findAll();
        assertThat(etudiantsLicenceList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the EtudiantsLicence in Elasticsearch
        verify(mockEtudiantsLicenceSearchRepository, times(1)).deleteById(etudiantsLicence.getId());
    }

    @Test
    @Transactional
    public void searchEtudiantsLicence() throws Exception {
        // Initialize the database
        etudiantsLicenceRepository.saveAndFlush(etudiantsLicence);
        when(mockEtudiantsLicenceSearchRepository.search(queryStringQuery("id:" + etudiantsLicence.getId())))
            .thenReturn(Collections.singletonList(etudiantsLicence));
        // Search the etudiantsLicence
        restEtudiantsLicenceMockMvc.perform(get("/api/_search/etudiants-licences?query=id:" + etudiantsLicence.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(etudiantsLicence.getId().intValue())))
            .andExpect(jsonPath("$.[*].suffixe").value(hasItem(DEFAULT_SUFFIXE)))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM)))
            .andExpect(jsonPath("$.[*].prenom").value(hasItem(DEFAULT_PRENOM)))
            .andExpect(jsonPath("$.[*].dateNaissance").value(hasItem(DEFAULT_DATE_NAISSANCE.toString())))
            .andExpect(jsonPath("$.[*].adresseContact").value(hasItem(DEFAULT_ADRESSE_CONTACT)))
            .andExpect(jsonPath("$.[*].ville").value(hasItem(DEFAULT_VILLE)))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL)))
            .andExpect(jsonPath("$.[*].pjBac").value(hasItem(DEFAULT_PJ_BAC.toString())))
            .andExpect(jsonPath("$.[*].mention").value(hasItem(DEFAULT_MENTION.toString())))
            .andExpect(jsonPath("$.[*].anneOtention").value(hasItem(DEFAULT_ANNE_OTENTION)))
            .andExpect(jsonPath("$.[*].cinPass").value(hasItem(DEFAULT_CIN_PASS)))
            .andExpect(jsonPath("$.[*].paysNationalite").value(hasItem(DEFAULT_PAYS_NATIONALITE)))
            .andExpect(jsonPath("$.[*].paysResidence").value(hasItem(DEFAULT_PAYS_RESIDENCE)))
            .andExpect(jsonPath("$.[*].codepostal").value(hasItem(DEFAULT_CODEPOSTAL)))
            .andExpect(jsonPath("$.[*].province").value(hasItem(DEFAULT_PROVINCE)))
            .andExpect(jsonPath("$.[*].tel").value(hasItem(DEFAULT_TEL)))
            .andExpect(jsonPath("$.[*].deuxiemeTel").value(hasItem(DEFAULT_DEUXIEME_TEL)))
            .andExpect(jsonPath("$.[*].photoContentType").value(hasItem(DEFAULT_PHOTO_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].photo").value(hasItem(Base64Utils.encodeToString(DEFAULT_PHOTO))))
            .andExpect(jsonPath("$.[*].extraitActeNaissanceContentType").value(hasItem(DEFAULT_EXTRAIT_ACTE_NAISSANCE_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].extraitActeNaissance").value(hasItem(Base64Utils.encodeToString(DEFAULT_EXTRAIT_ACTE_NAISSANCE))))
            .andExpect(jsonPath("$.[*].bacalaureatContentType").value(hasItem(DEFAULT_BACALAUREAT_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].bacalaureat").value(hasItem(Base64Utils.encodeToString(DEFAULT_BACALAUREAT))))
            .andExpect(jsonPath("$.[*].cinPassportContentType").value(hasItem(DEFAULT_CIN_PASSPORT_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].cinPassport").value(hasItem(Base64Utils.encodeToString(DEFAULT_CIN_PASSPORT))))
            .andExpect(jsonPath("$.[*].inscriptionvalide").value(hasItem(DEFAULT_INSCRIPTIONVALIDE.booleanValue())))
            .andExpect(jsonPath("$.[*].absent").value(hasItem(DEFAULT_ABSENT.booleanValue())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EtudiantsLicence.class);
        EtudiantsLicence etudiantsLicence1 = new EtudiantsLicence();
        etudiantsLicence1.setId(1L);
        EtudiantsLicence etudiantsLicence2 = new EtudiantsLicence();
        etudiantsLicence2.setId(etudiantsLicence1.getId());
        assertThat(etudiantsLicence1).isEqualTo(etudiantsLicence2);
        etudiantsLicence2.setId(2L);
        assertThat(etudiantsLicence1).isNotEqualTo(etudiantsLicence2);
        etudiantsLicence1.setId(null);
        assertThat(etudiantsLicence1).isNotEqualTo(etudiantsLicence2);
    }
}
