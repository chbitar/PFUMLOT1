package com.planeta.pfum.web.rest;

import static com.planeta.pfum.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Collections;
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

import com.planeta.pfum.Pfumv10App;
import com.planeta.pfum.domain.EtudiantsMaster;
import com.planeta.pfum.domain.enumeration.DiplomeBac;
import com.planeta.pfum.domain.enumeration.Mention;
import com.planeta.pfum.repository.EtudiantsMasterRepository;
import com.planeta.pfum.repository.FiliereRepository;
import com.planeta.pfum.repository.UserRepository;
import com.planeta.pfum.repository.search.EtudiantsMasterSearchRepository;
import com.planeta.pfum.service.UserService;
import com.planeta.pfum.web.rest.errors.ExceptionTranslator;
/**
 * Integration tests for the {@Link EtudiantsMasterResource} REST controller.
 */
@SpringBootTest(classes = Pfumv10App.class)
public class EtudiantsMasterResourceIT {

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

    private static final DiplomeBac DEFAULT_TYPE_BAC = DiplomeBac.Sciences_De_La_Vie_Et_De_La_Terre;
    private static final DiplomeBac UPDATED_TYPE_BAC = DiplomeBac.Sciences_Physiques_Et_Chimiques;

    private static final Mention DEFAULT_MENTION = Mention.Passable;
    private static final Mention UPDATED_MENTION = Mention.Assez_bien;

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

    private static final byte[] DEFAULT_DIPLOME = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_DIPLOME = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_DIPLOME_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_DIPLOME_CONTENT_TYPE = "image/png";

    private static final Boolean DEFAULT_INSCRIPTIONVALIDE = false;
    private static final Boolean UPDATED_INSCRIPTIONVALIDE = true;

    private static final Boolean DEFAULT_ABSENT = false;
    private static final Boolean UPDATED_ABSENT = true;

    @Autowired
    private EtudiantsMasterRepository etudiantsMasterRepository;

    /**
     * This repository is mocked in the com.planeta.pfum.repository.search test package.
     *
     * @see com.planeta.pfum.repository.search.EtudiantsMasterSearchRepositoryMockConfiguration
     */
    @Autowired
    private EtudiantsMasterSearchRepository mockEtudiantsMasterSearchRepository;

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

    private MockMvc restEtudiantsMasterMockMvc;

    private EtudiantsMaster etudiantsMaster;

    

    @Autowired
    private  FiliereRepository filiereRepository;
    @Autowired
    private  UserService userService;
    @Autowired
    private  UserRepository userRepository;


    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EtudiantsMasterResource etudiantsMasterResource = new EtudiantsMasterResource(etudiantsMasterRepository, mockEtudiantsMasterSearchRepository,filiereRepository,userRepository,userService);
        this.restEtudiantsMasterMockMvc = MockMvcBuilders.standaloneSetup(etudiantsMasterResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }
    @BeforeEach

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static EtudiantsMaster createEntity(EntityManager em) {
        EtudiantsMaster etudiantsMaster = new EtudiantsMaster()
            .suffixe(DEFAULT_SUFFIXE)
            .nom(DEFAULT_NOM)
            .prenom(DEFAULT_PRENOM)
            .dateNaissance(DEFAULT_DATE_NAISSANCE)
            .adresseContact(DEFAULT_ADRESSE_CONTACT)
            .ville(DEFAULT_VILLE)
            .email(DEFAULT_EMAIL)
            .typeBac(DEFAULT_TYPE_BAC)
            .mention(DEFAULT_MENTION)
            .cinPass(DEFAULT_CIN_PASS)
            .paysNationalite(DEFAULT_PAYS_NATIONALITE)
            .paysResidence(DEFAULT_PAYS_RESIDENCE)
            .codepostal(DEFAULT_CODEPOSTAL)
            .province(DEFAULT_PROVINCE)
            .tel(DEFAULT_TEL)
            .photo(DEFAULT_PHOTO)
            .photoContentType(DEFAULT_PHOTO_CONTENT_TYPE)
            .extraitActeNaissance(DEFAULT_EXTRAIT_ACTE_NAISSANCE)
            .extraitActeNaissanceContentType(DEFAULT_EXTRAIT_ACTE_NAISSANCE_CONTENT_TYPE)
            .bacalaureat(DEFAULT_BACALAUREAT)
            .bacalaureatContentType(DEFAULT_BACALAUREAT_CONTENT_TYPE)
            .cinPassport(DEFAULT_CIN_PASSPORT)
            .cinPassportContentType(DEFAULT_CIN_PASSPORT_CONTENT_TYPE)
            .diplome(DEFAULT_DIPLOME)
            .diplomeContentType(DEFAULT_DIPLOME_CONTENT_TYPE)
            .inscriptionvalide(DEFAULT_INSCRIPTIONVALIDE)
            .absent(DEFAULT_ABSENT);
        return etudiantsMaster;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static EtudiantsMaster createUpdatedEntity(EntityManager em) {
        EtudiantsMaster etudiantsMaster = new EtudiantsMaster()
            .suffixe(UPDATED_SUFFIXE)
            .nom(UPDATED_NOM)
            .prenom(UPDATED_PRENOM)
            .dateNaissance(UPDATED_DATE_NAISSANCE)
            .adresseContact(UPDATED_ADRESSE_CONTACT)
            .ville(UPDATED_VILLE)
            .email(UPDATED_EMAIL)
            .typeBac(UPDATED_TYPE_BAC)
            .mention(UPDATED_MENTION)
            .cinPass(UPDATED_CIN_PASS)
            .paysNationalite(UPDATED_PAYS_NATIONALITE)
            .paysResidence(UPDATED_PAYS_RESIDENCE)
            .codepostal(UPDATED_CODEPOSTAL)
            .province(UPDATED_PROVINCE)
            .tel(UPDATED_TEL)
            .photo(UPDATED_PHOTO)
            .photoContentType(UPDATED_PHOTO_CONTENT_TYPE)
            .extraitActeNaissance(UPDATED_EXTRAIT_ACTE_NAISSANCE)
            .extraitActeNaissanceContentType(UPDATED_EXTRAIT_ACTE_NAISSANCE_CONTENT_TYPE)
            .bacalaureat(UPDATED_BACALAUREAT)
            .bacalaureatContentType(UPDATED_BACALAUREAT_CONTENT_TYPE)
            .cinPassport(UPDATED_CIN_PASSPORT)
            .cinPassportContentType(UPDATED_CIN_PASSPORT_CONTENT_TYPE)
            .diplome(UPDATED_DIPLOME)
            .diplomeContentType(UPDATED_DIPLOME_CONTENT_TYPE)
            .inscriptionvalide(UPDATED_INSCRIPTIONVALIDE)
            .absent(UPDATED_ABSENT);
        return etudiantsMaster;
    }

    @BeforeEach
    public void initTest() {
        etudiantsMaster = createEntity(em);
    }

    @Test
    @Transactional
    public void createEtudiantsMaster() throws Exception {
        int databaseSizeBeforeCreate = etudiantsMasterRepository.findAll().size();

        // Create the EtudiantsMaster
        restEtudiantsMasterMockMvc.perform(post("/api/etudiants-masters")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(etudiantsMaster)))
            .andExpect(status().isCreated());

        // Validate the EtudiantsMaster in the database
        List<EtudiantsMaster> etudiantsMasterList = etudiantsMasterRepository.findAll();
        assertThat(etudiantsMasterList).hasSize(databaseSizeBeforeCreate + 1);
        EtudiantsMaster testEtudiantsMaster = etudiantsMasterList.get(etudiantsMasterList.size() - 1);
        assertThat(testEtudiantsMaster.getSuffixe()).isEqualTo(DEFAULT_SUFFIXE);
        assertThat(testEtudiantsMaster.getNom()).isEqualTo(DEFAULT_NOM);
        assertThat(testEtudiantsMaster.getPrenom()).isEqualTo(DEFAULT_PRENOM);
        assertThat(testEtudiantsMaster.getDateNaissance()).isEqualTo(DEFAULT_DATE_NAISSANCE);
        assertThat(testEtudiantsMaster.getAdresseContact()).isEqualTo(DEFAULT_ADRESSE_CONTACT);
        assertThat(testEtudiantsMaster.getVille()).isEqualTo(DEFAULT_VILLE);
        assertThat(testEtudiantsMaster.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testEtudiantsMaster.getTypeBac()).isEqualTo(DEFAULT_TYPE_BAC);
        assertThat(testEtudiantsMaster.getMention()).isEqualTo(DEFAULT_MENTION);
        assertThat(testEtudiantsMaster.getCinPass()).isEqualTo(DEFAULT_CIN_PASS);
        assertThat(testEtudiantsMaster.getPaysNationalite()).isEqualTo(DEFAULT_PAYS_NATIONALITE);
        assertThat(testEtudiantsMaster.getPaysResidence()).isEqualTo(DEFAULT_PAYS_RESIDENCE);
        assertThat(testEtudiantsMaster.getCodepostal()).isEqualTo(DEFAULT_CODEPOSTAL);
        assertThat(testEtudiantsMaster.getProvince()).isEqualTo(DEFAULT_PROVINCE);
        assertThat(testEtudiantsMaster.getTel()).isEqualTo(DEFAULT_TEL);
        assertThat(testEtudiantsMaster.getPhoto()).isEqualTo(DEFAULT_PHOTO);
        assertThat(testEtudiantsMaster.getPhotoContentType()).isEqualTo(DEFAULT_PHOTO_CONTENT_TYPE);
        assertThat(testEtudiantsMaster.getExtraitActeNaissance()).isEqualTo(DEFAULT_EXTRAIT_ACTE_NAISSANCE);
        assertThat(testEtudiantsMaster.getExtraitActeNaissanceContentType()).isEqualTo(DEFAULT_EXTRAIT_ACTE_NAISSANCE_CONTENT_TYPE);
        assertThat(testEtudiantsMaster.getBacalaureat()).isEqualTo(DEFAULT_BACALAUREAT);
        assertThat(testEtudiantsMaster.getBacalaureatContentType()).isEqualTo(DEFAULT_BACALAUREAT_CONTENT_TYPE);
        assertThat(testEtudiantsMaster.getCinPassport()).isEqualTo(DEFAULT_CIN_PASSPORT);
        assertThat(testEtudiantsMaster.getCinPassportContentType()).isEqualTo(DEFAULT_CIN_PASSPORT_CONTENT_TYPE);
        assertThat(testEtudiantsMaster.getDiplome()).isEqualTo(DEFAULT_DIPLOME);
        assertThat(testEtudiantsMaster.getDiplomeContentType()).isEqualTo(DEFAULT_DIPLOME_CONTENT_TYPE);
        assertThat(testEtudiantsMaster.isInscriptionvalide()).isEqualTo(DEFAULT_INSCRIPTIONVALIDE);
        assertThat(testEtudiantsMaster.isAbsent()).isEqualTo(DEFAULT_ABSENT);

        // Validate the EtudiantsMaster in Elasticsearch
        verify(mockEtudiantsMasterSearchRepository, times(1)).save(testEtudiantsMaster);
    }

    @Test
    @Transactional
    public void createEtudiantsMasterWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = etudiantsMasterRepository.findAll().size();

        // Create the EtudiantsMaster with an existing ID
        etudiantsMaster.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEtudiantsMasterMockMvc.perform(post("/api/etudiants-masters")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(etudiantsMaster)))
            .andExpect(status().isBadRequest());

        // Validate the EtudiantsMaster in the database
        List<EtudiantsMaster> etudiantsMasterList = etudiantsMasterRepository.findAll();
        assertThat(etudiantsMasterList).hasSize(databaseSizeBeforeCreate);

        // Validate the EtudiantsMaster in Elasticsearch
        verify(mockEtudiantsMasterSearchRepository, times(0)).save(etudiantsMaster);
    }


    @Test
    @Transactional
    public void checkNomIsRequired() throws Exception {
        int databaseSizeBeforeTest = etudiantsMasterRepository.findAll().size();
        // set the field null
        etudiantsMaster.setNom(null);

        // Create the EtudiantsMaster, which fails.

        restEtudiantsMasterMockMvc.perform(post("/api/etudiants-masters")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(etudiantsMaster)))
            .andExpect(status().isBadRequest());

        List<EtudiantsMaster> etudiantsMasterList = etudiantsMasterRepository.findAll();
        assertThat(etudiantsMasterList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPrenomIsRequired() throws Exception {
        int databaseSizeBeforeTest = etudiantsMasterRepository.findAll().size();
        // set the field null
        etudiantsMaster.setPrenom(null);

        // Create the EtudiantsMaster, which fails.

        restEtudiantsMasterMockMvc.perform(post("/api/etudiants-masters")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(etudiantsMaster)))
            .andExpect(status().isBadRequest());

        List<EtudiantsMaster> etudiantsMasterList = etudiantsMasterRepository.findAll();
        assertThat(etudiantsMasterList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDateNaissanceIsRequired() throws Exception {
        int databaseSizeBeforeTest = etudiantsMasterRepository.findAll().size();
        // set the field null
        etudiantsMaster.setDateNaissance(null);

        // Create the EtudiantsMaster, which fails.

        restEtudiantsMasterMockMvc.perform(post("/api/etudiants-masters")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(etudiantsMaster)))
            .andExpect(status().isBadRequest());

        List<EtudiantsMaster> etudiantsMasterList = etudiantsMasterRepository.findAll();
        assertThat(etudiantsMasterList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkAdresseContactIsRequired() throws Exception {
        int databaseSizeBeforeTest = etudiantsMasterRepository.findAll().size();
        // set the field null
        etudiantsMaster.setAdresseContact(null);

        // Create the EtudiantsMaster, which fails.

        restEtudiantsMasterMockMvc.perform(post("/api/etudiants-masters")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(etudiantsMaster)))
            .andExpect(status().isBadRequest());

        List<EtudiantsMaster> etudiantsMasterList = etudiantsMasterRepository.findAll();
        assertThat(etudiantsMasterList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkEmailIsRequired() throws Exception {
        int databaseSizeBeforeTest = etudiantsMasterRepository.findAll().size();
        // set the field null
        etudiantsMaster.setEmail(null);

        // Create the EtudiantsMaster, which fails.

        restEtudiantsMasterMockMvc.perform(post("/api/etudiants-masters")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(etudiantsMaster)))
            .andExpect(status().isBadRequest());

        List<EtudiantsMaster> etudiantsMasterList = etudiantsMasterRepository.findAll();
        assertThat(etudiantsMasterList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCinPassIsRequired() throws Exception {
        int databaseSizeBeforeTest = etudiantsMasterRepository.findAll().size();
        // set the field null
        etudiantsMaster.setCinPass(null);

        // Create the EtudiantsMaster, which fails.

        restEtudiantsMasterMockMvc.perform(post("/api/etudiants-masters")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(etudiantsMaster)))
            .andExpect(status().isBadRequest());

        List<EtudiantsMaster> etudiantsMasterList = etudiantsMasterRepository.findAll();
        assertThat(etudiantsMasterList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllEtudiantsMasters() throws Exception {
        // Initialize the database
        etudiantsMasterRepository.saveAndFlush(etudiantsMaster);

        // Get all the etudiantsMasterList
        restEtudiantsMasterMockMvc.perform(get("/api/etudiants-masters?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(etudiantsMaster.getId().intValue())))
            .andExpect(jsonPath("$.[*].suffixe").value(hasItem(DEFAULT_SUFFIXE.toString())))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM.toString())))
            .andExpect(jsonPath("$.[*].prenom").value(hasItem(DEFAULT_PRENOM.toString())))
            .andExpect(jsonPath("$.[*].dateNaissance").value(hasItem(DEFAULT_DATE_NAISSANCE.toString())))
            .andExpect(jsonPath("$.[*].adresseContact").value(hasItem(DEFAULT_ADRESSE_CONTACT.toString())))
            .andExpect(jsonPath("$.[*].ville").value(hasItem(DEFAULT_VILLE.toString())))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL.toString())))
            .andExpect(jsonPath("$.[*].typeBac").value(hasItem(DEFAULT_TYPE_BAC.toString())))
            .andExpect(jsonPath("$.[*].mention").value(hasItem(DEFAULT_MENTION.toString())))
            .andExpect(jsonPath("$.[*].cinPass").value(hasItem(DEFAULT_CIN_PASS.toString())))
            .andExpect(jsonPath("$.[*].paysNationalite").value(hasItem(DEFAULT_PAYS_NATIONALITE.toString())))
            .andExpect(jsonPath("$.[*].paysResidence").value(hasItem(DEFAULT_PAYS_RESIDENCE.toString())))
            .andExpect(jsonPath("$.[*].codepostal").value(hasItem(DEFAULT_CODEPOSTAL.toString())))
            .andExpect(jsonPath("$.[*].province").value(hasItem(DEFAULT_PROVINCE.toString())))
            .andExpect(jsonPath("$.[*].tel").value(hasItem(DEFAULT_TEL)))
            .andExpect(jsonPath("$.[*].photoContentType").value(hasItem(DEFAULT_PHOTO_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].photo").value(hasItem(Base64Utils.encodeToString(DEFAULT_PHOTO))))
            .andExpect(jsonPath("$.[*].extraitActeNaissanceContentType").value(hasItem(DEFAULT_EXTRAIT_ACTE_NAISSANCE_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].extraitActeNaissance").value(hasItem(Base64Utils.encodeToString(DEFAULT_EXTRAIT_ACTE_NAISSANCE))))
            .andExpect(jsonPath("$.[*].bacalaureatContentType").value(hasItem(DEFAULT_BACALAUREAT_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].bacalaureat").value(hasItem(Base64Utils.encodeToString(DEFAULT_BACALAUREAT))))
            .andExpect(jsonPath("$.[*].cinPassportContentType").value(hasItem(DEFAULT_CIN_PASSPORT_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].cinPassport").value(hasItem(Base64Utils.encodeToString(DEFAULT_CIN_PASSPORT))))
            .andExpect(jsonPath("$.[*].diplomeContentType").value(hasItem(DEFAULT_DIPLOME_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].diplome").value(hasItem(Base64Utils.encodeToString(DEFAULT_DIPLOME))))
            .andExpect(jsonPath("$.[*].inscriptionvalide").value(hasItem(DEFAULT_INSCRIPTIONVALIDE.booleanValue())))
            .andExpect(jsonPath("$.[*].absent").value(hasItem(DEFAULT_ABSENT.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getEtudiantsMaster() throws Exception {
        // Initialize the database
        etudiantsMasterRepository.saveAndFlush(etudiantsMaster);

        // Get the etudiantsMaster
        restEtudiantsMasterMockMvc.perform(get("/api/etudiants-masters/{id}", etudiantsMaster.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(etudiantsMaster.getId().intValue()))
            .andExpect(jsonPath("$.suffixe").value(DEFAULT_SUFFIXE.toString()))
            .andExpect(jsonPath("$.nom").value(DEFAULT_NOM.toString()))
            .andExpect(jsonPath("$.prenom").value(DEFAULT_PRENOM.toString()))
            .andExpect(jsonPath("$.dateNaissance").value(DEFAULT_DATE_NAISSANCE.toString()))
            .andExpect(jsonPath("$.adresseContact").value(DEFAULT_ADRESSE_CONTACT.toString()))
            .andExpect(jsonPath("$.ville").value(DEFAULT_VILLE.toString()))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL.toString()))
            .andExpect(jsonPath("$.typeBac").value(DEFAULT_TYPE_BAC.toString()))
            .andExpect(jsonPath("$.mention").value(DEFAULT_MENTION.toString()))
            .andExpect(jsonPath("$.cinPass").value(DEFAULT_CIN_PASS.toString()))
            .andExpect(jsonPath("$.paysNationalite").value(DEFAULT_PAYS_NATIONALITE.toString()))
            .andExpect(jsonPath("$.paysResidence").value(DEFAULT_PAYS_RESIDENCE.toString()))
            .andExpect(jsonPath("$.codepostal").value(DEFAULT_CODEPOSTAL.toString()))
            .andExpect(jsonPath("$.province").value(DEFAULT_PROVINCE.toString()))
            .andExpect(jsonPath("$.tel").value(DEFAULT_TEL))
            .andExpect(jsonPath("$.photoContentType").value(DEFAULT_PHOTO_CONTENT_TYPE))
            .andExpect(jsonPath("$.photo").value(Base64Utils.encodeToString(DEFAULT_PHOTO)))
            .andExpect(jsonPath("$.extraitActeNaissanceContentType").value(DEFAULT_EXTRAIT_ACTE_NAISSANCE_CONTENT_TYPE))
            .andExpect(jsonPath("$.extraitActeNaissance").value(Base64Utils.encodeToString(DEFAULT_EXTRAIT_ACTE_NAISSANCE)))
            .andExpect(jsonPath("$.bacalaureatContentType").value(DEFAULT_BACALAUREAT_CONTENT_TYPE))
            .andExpect(jsonPath("$.bacalaureat").value(Base64Utils.encodeToString(DEFAULT_BACALAUREAT)))
            .andExpect(jsonPath("$.cinPassportContentType").value(DEFAULT_CIN_PASSPORT_CONTENT_TYPE))
            .andExpect(jsonPath("$.cinPassport").value(Base64Utils.encodeToString(DEFAULT_CIN_PASSPORT)))
            .andExpect(jsonPath("$.diplomeContentType").value(DEFAULT_DIPLOME_CONTENT_TYPE))
            .andExpect(jsonPath("$.diplome").value(Base64Utils.encodeToString(DEFAULT_DIPLOME)))
            .andExpect(jsonPath("$.inscriptionvalide").value(DEFAULT_INSCRIPTIONVALIDE.booleanValue()))
            .andExpect(jsonPath("$.absent").value(DEFAULT_ABSENT.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingEtudiantsMaster() throws Exception {
        // Get the etudiantsMaster
        restEtudiantsMasterMockMvc.perform(get("/api/etudiants-masters/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEtudiantsMaster() throws Exception {
        // Initialize the database
        etudiantsMasterRepository.saveAndFlush(etudiantsMaster);

        int databaseSizeBeforeUpdate = etudiantsMasterRepository.findAll().size();

        // Update the etudiantsMaster
        EtudiantsMaster updatedEtudiantsMaster = etudiantsMasterRepository.findById(etudiantsMaster.getId()).get();
        // Disconnect from session so that the updates on updatedEtudiantsMaster are not directly saved in db
        em.detach(updatedEtudiantsMaster);
        updatedEtudiantsMaster
            .suffixe(UPDATED_SUFFIXE)
            .nom(UPDATED_NOM)
            .prenom(UPDATED_PRENOM)
            .dateNaissance(UPDATED_DATE_NAISSANCE)
            .adresseContact(UPDATED_ADRESSE_CONTACT)
            .ville(UPDATED_VILLE)
            .email(UPDATED_EMAIL)
            .typeBac(UPDATED_TYPE_BAC)
            .mention(UPDATED_MENTION)
            .cinPass(UPDATED_CIN_PASS)
            .paysNationalite(UPDATED_PAYS_NATIONALITE)
            .paysResidence(UPDATED_PAYS_RESIDENCE)
            .codepostal(UPDATED_CODEPOSTAL)
            .province(UPDATED_PROVINCE)
            .tel(UPDATED_TEL)
            .photo(UPDATED_PHOTO)
            .photoContentType(UPDATED_PHOTO_CONTENT_TYPE)
            .extraitActeNaissance(UPDATED_EXTRAIT_ACTE_NAISSANCE)
            .extraitActeNaissanceContentType(UPDATED_EXTRAIT_ACTE_NAISSANCE_CONTENT_TYPE)
            .bacalaureat(UPDATED_BACALAUREAT)
            .bacalaureatContentType(UPDATED_BACALAUREAT_CONTENT_TYPE)
            .cinPassport(UPDATED_CIN_PASSPORT)
            .cinPassportContentType(UPDATED_CIN_PASSPORT_CONTENT_TYPE)
            .diplome(UPDATED_DIPLOME)
            .diplomeContentType(UPDATED_DIPLOME_CONTENT_TYPE)
            .inscriptionvalide(UPDATED_INSCRIPTIONVALIDE)
            .absent(UPDATED_ABSENT);

        restEtudiantsMasterMockMvc.perform(put("/api/etudiants-masters")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEtudiantsMaster)))
            .andExpect(status().isOk());

        // Validate the EtudiantsMaster in the database
        List<EtudiantsMaster> etudiantsMasterList = etudiantsMasterRepository.findAll();
        assertThat(etudiantsMasterList).hasSize(databaseSizeBeforeUpdate);
        EtudiantsMaster testEtudiantsMaster = etudiantsMasterList.get(etudiantsMasterList.size() - 1);
        assertThat(testEtudiantsMaster.getSuffixe()).isEqualTo(UPDATED_SUFFIXE);
        assertThat(testEtudiantsMaster.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testEtudiantsMaster.getPrenom()).isEqualTo(UPDATED_PRENOM);
        assertThat(testEtudiantsMaster.getDateNaissance()).isEqualTo(UPDATED_DATE_NAISSANCE);
        assertThat(testEtudiantsMaster.getAdresseContact()).isEqualTo(UPDATED_ADRESSE_CONTACT);
        assertThat(testEtudiantsMaster.getVille()).isEqualTo(UPDATED_VILLE);
        assertThat(testEtudiantsMaster.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testEtudiantsMaster.getTypeBac()).isEqualTo(UPDATED_TYPE_BAC);
        assertThat(testEtudiantsMaster.getMention()).isEqualTo(UPDATED_MENTION);
        assertThat(testEtudiantsMaster.getCinPass()).isEqualTo(UPDATED_CIN_PASS);
        assertThat(testEtudiantsMaster.getPaysNationalite()).isEqualTo(UPDATED_PAYS_NATIONALITE);
        assertThat(testEtudiantsMaster.getPaysResidence()).isEqualTo(UPDATED_PAYS_RESIDENCE);
        assertThat(testEtudiantsMaster.getCodepostal()).isEqualTo(UPDATED_CODEPOSTAL);
        assertThat(testEtudiantsMaster.getProvince()).isEqualTo(UPDATED_PROVINCE);
        assertThat(testEtudiantsMaster.getTel()).isEqualTo(UPDATED_TEL);
        assertThat(testEtudiantsMaster.getPhoto()).isEqualTo(UPDATED_PHOTO);
        assertThat(testEtudiantsMaster.getPhotoContentType()).isEqualTo(UPDATED_PHOTO_CONTENT_TYPE);
        assertThat(testEtudiantsMaster.getExtraitActeNaissance()).isEqualTo(UPDATED_EXTRAIT_ACTE_NAISSANCE);
        assertThat(testEtudiantsMaster.getExtraitActeNaissanceContentType()).isEqualTo(UPDATED_EXTRAIT_ACTE_NAISSANCE_CONTENT_TYPE);
        assertThat(testEtudiantsMaster.getBacalaureat()).isEqualTo(UPDATED_BACALAUREAT);
        assertThat(testEtudiantsMaster.getBacalaureatContentType()).isEqualTo(UPDATED_BACALAUREAT_CONTENT_TYPE);
        assertThat(testEtudiantsMaster.getCinPassport()).isEqualTo(UPDATED_CIN_PASSPORT);
        assertThat(testEtudiantsMaster.getCinPassportContentType()).isEqualTo(UPDATED_CIN_PASSPORT_CONTENT_TYPE);
        assertThat(testEtudiantsMaster.getDiplome()).isEqualTo(UPDATED_DIPLOME);
        assertThat(testEtudiantsMaster.getDiplomeContentType()).isEqualTo(UPDATED_DIPLOME_CONTENT_TYPE);
        assertThat(testEtudiantsMaster.isInscriptionvalide()).isEqualTo(UPDATED_INSCRIPTIONVALIDE);
        assertThat(testEtudiantsMaster.isAbsent()).isEqualTo(UPDATED_ABSENT);

        // Validate the EtudiantsMaster in Elasticsearch
        verify(mockEtudiantsMasterSearchRepository, times(1)).save(testEtudiantsMaster);
    }

    @Test
    @Transactional
    public void updateNonExistingEtudiantsMaster() throws Exception {
        int databaseSizeBeforeUpdate = etudiantsMasterRepository.findAll().size();

        // Create the EtudiantsMaster

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEtudiantsMasterMockMvc.perform(put("/api/etudiants-masters")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(etudiantsMaster)))
            .andExpect(status().isBadRequest());

        // Validate the EtudiantsMaster in the database
        List<EtudiantsMaster> etudiantsMasterList = etudiantsMasterRepository.findAll();
        assertThat(etudiantsMasterList).hasSize(databaseSizeBeforeUpdate);

        // Validate the EtudiantsMaster in Elasticsearch
        verify(mockEtudiantsMasterSearchRepository, times(0)).save(etudiantsMaster);
    }

    @Test
    @Transactional
    public void deleteEtudiantsMaster() throws Exception {
        // Initialize the database
        etudiantsMasterRepository.saveAndFlush(etudiantsMaster);

        int databaseSizeBeforeDelete = etudiantsMasterRepository.findAll().size();

        // Delete the etudiantsMaster
        restEtudiantsMasterMockMvc.perform(delete("/api/etudiants-masters/{id}", etudiantsMaster.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<EtudiantsMaster> etudiantsMasterList = etudiantsMasterRepository.findAll();
        assertThat(etudiantsMasterList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the EtudiantsMaster in Elasticsearch
        verify(mockEtudiantsMasterSearchRepository, times(1)).deleteById(etudiantsMaster.getId());
    }

    @Test
    @Transactional
    public void searchEtudiantsMaster() throws Exception {
        // Initialize the database
        etudiantsMasterRepository.saveAndFlush(etudiantsMaster);
        when(mockEtudiantsMasterSearchRepository.search(queryStringQuery("id:" + etudiantsMaster.getId())))
            .thenReturn(Collections.singletonList(etudiantsMaster));
        // Search the etudiantsMaster
        restEtudiantsMasterMockMvc.perform(get("/api/_search/etudiants-masters?query=id:" + etudiantsMaster.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(etudiantsMaster.getId().intValue())))
            .andExpect(jsonPath("$.[*].suffixe").value(hasItem(DEFAULT_SUFFIXE)))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM)))
            .andExpect(jsonPath("$.[*].prenom").value(hasItem(DEFAULT_PRENOM)))
            .andExpect(jsonPath("$.[*].dateNaissance").value(hasItem(DEFAULT_DATE_NAISSANCE.toString())))
            .andExpect(jsonPath("$.[*].adresseContact").value(hasItem(DEFAULT_ADRESSE_CONTACT)))
            .andExpect(jsonPath("$.[*].ville").value(hasItem(DEFAULT_VILLE)))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL)))
            .andExpect(jsonPath("$.[*].typeBac").value(hasItem(DEFAULT_TYPE_BAC.toString())))
            .andExpect(jsonPath("$.[*].mention").value(hasItem(DEFAULT_MENTION.toString())))
            .andExpect(jsonPath("$.[*].cinPass").value(hasItem(DEFAULT_CIN_PASS)))
            .andExpect(jsonPath("$.[*].paysNationalite").value(hasItem(DEFAULT_PAYS_NATIONALITE)))
            .andExpect(jsonPath("$.[*].paysResidence").value(hasItem(DEFAULT_PAYS_RESIDENCE)))
            .andExpect(jsonPath("$.[*].codepostal").value(hasItem(DEFAULT_CODEPOSTAL)))
            .andExpect(jsonPath("$.[*].province").value(hasItem(DEFAULT_PROVINCE)))
            .andExpect(jsonPath("$.[*].tel").value(hasItem(DEFAULT_TEL)))
            .andExpect(jsonPath("$.[*].photoContentType").value(hasItem(DEFAULT_PHOTO_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].photo").value(hasItem(Base64Utils.encodeToString(DEFAULT_PHOTO))))
            .andExpect(jsonPath("$.[*].extraitActeNaissanceContentType").value(hasItem(DEFAULT_EXTRAIT_ACTE_NAISSANCE_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].extraitActeNaissance").value(hasItem(Base64Utils.encodeToString(DEFAULT_EXTRAIT_ACTE_NAISSANCE))))
            .andExpect(jsonPath("$.[*].bacalaureatContentType").value(hasItem(DEFAULT_BACALAUREAT_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].bacalaureat").value(hasItem(Base64Utils.encodeToString(DEFAULT_BACALAUREAT))))
            .andExpect(jsonPath("$.[*].cinPassportContentType").value(hasItem(DEFAULT_CIN_PASSPORT_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].cinPassport").value(hasItem(Base64Utils.encodeToString(DEFAULT_CIN_PASSPORT))))
            .andExpect(jsonPath("$.[*].diplomeContentType").value(hasItem(DEFAULT_DIPLOME_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].diplome").value(hasItem(Base64Utils.encodeToString(DEFAULT_DIPLOME))))
            .andExpect(jsonPath("$.[*].inscriptionvalide").value(hasItem(DEFAULT_INSCRIPTIONVALIDE.booleanValue())))
            .andExpect(jsonPath("$.[*].absent").value(hasItem(DEFAULT_ABSENT.booleanValue())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EtudiantsMaster.class);
        EtudiantsMaster etudiantsMaster1 = new EtudiantsMaster();
        etudiantsMaster1.setId(1L);
        EtudiantsMaster etudiantsMaster2 = new EtudiantsMaster();
        etudiantsMaster2.setId(etudiantsMaster1.getId());
        assertThat(etudiantsMaster1).isEqualTo(etudiantsMaster2);
        etudiantsMaster2.setId(2L);
        assertThat(etudiantsMaster1).isNotEqualTo(etudiantsMaster2);
        etudiantsMaster1.setId(null);
        assertThat(etudiantsMaster1).isNotEqualTo(etudiantsMaster2);
    }
}
