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

import java.time.Instant;
import java.time.temporal.ChronoUnit;
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
import com.planeta.pfum.domain.Absence;
import com.planeta.pfum.domain.AnneeInscription;
import com.planeta.pfum.domain.EspaceEtudiant;
import com.planeta.pfum.domain.EtudiantsMaster;
import com.planeta.pfum.domain.Filiere;
import com.planeta.pfum.domain.ModalitePaiement;
import com.planeta.pfum.domain.User;
import com.planeta.pfum.domain.enumeration.DiplomeBac;
import com.planeta.pfum.domain.enumeration.Mention;
import com.planeta.pfum.repository.EtudiantsMasterRepository;
import com.planeta.pfum.web.rest.errors.ExceptionTranslator;
/**
 * Integration tests for the {@Link EtudiantsMasterResource} REST controller.
 */
@SpringBootTest(classes = PfumApp.class)
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

    private static final String DEFAULT_ANNEE_OBTENTION = "AAAAAAAAAA";
    private static final String UPDATED_ANNEE_OBTENTION = "BBBBBBBBBB";

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

    private static final byte[] DEFAULT_TEST_ADMISSION = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_TEST_ADMISSION = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_TEST_ADMISSION_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_TEST_ADMISSION_CONTENT_TYPE = "image/png";

    private static final byte[] DEFAULT_RELEVES_NOTES = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_RELEVES_NOTES = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_RELEVES_NOTES_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_RELEVES_NOTES_CONTENT_TYPE = "image/png";

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

    private static final String DEFAULT_ETABLISSEMENT_OBTENTION = "AAAAAAAAAA";
    private static final String UPDATED_ETABLISSEMENT_OBTENTION = "BBBBBBBBBB";

    @Autowired
    private EtudiantsMasterRepository etudiantsMasterRepository;


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

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EtudiantsMasterResource etudiantsMasterResource = new EtudiantsMasterResource(etudiantsMasterRepository);
        this.restEtudiantsMasterMockMvc = MockMvcBuilders.standaloneSetup(etudiantsMasterResource)
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
            .anneeObtention(DEFAULT_ANNEE_OBTENTION)
            .cinPass(DEFAULT_CIN_PASS)
            .paysNationalite(DEFAULT_PAYS_NATIONALITE)
            .paysResidence(DEFAULT_PAYS_RESIDENCE)
            .codepostal(DEFAULT_CODEPOSTAL)
            .province(DEFAULT_PROVINCE)
            .tel(DEFAULT_TEL)
            .deuxiemeTel(DEFAULT_DEUXIEME_TEL)
            .photo(DEFAULT_PHOTO)
            .photoContentType(DEFAULT_PHOTO_CONTENT_TYPE)
            .testAdmission(DEFAULT_TEST_ADMISSION)
            .testAdmissionContentType(DEFAULT_TEST_ADMISSION_CONTENT_TYPE)
            .relevesNotes(DEFAULT_RELEVES_NOTES)
            .relevesNotesContentType(DEFAULT_RELEVES_NOTES_CONTENT_TYPE)
            .bacalaureat(DEFAULT_BACALAUREAT)
            .bacalaureatContentType(DEFAULT_BACALAUREAT_CONTENT_TYPE)
            .cinPassport(DEFAULT_CIN_PASSPORT)
            .cinPassportContentType(DEFAULT_CIN_PASSPORT_CONTENT_TYPE)
            .diplome(DEFAULT_DIPLOME)
            .diplomeContentType(DEFAULT_DIPLOME_CONTENT_TYPE)
            .inscriptionvalide(DEFAULT_INSCRIPTIONVALIDE)
            .absent(DEFAULT_ABSENT)
            .etablissementObtention(DEFAULT_ETABLISSEMENT_OBTENTION);
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
            .anneeObtention(UPDATED_ANNEE_OBTENTION)
            .cinPass(UPDATED_CIN_PASS)
            .paysNationalite(UPDATED_PAYS_NATIONALITE)
            .paysResidence(UPDATED_PAYS_RESIDENCE)
            .codepostal(UPDATED_CODEPOSTAL)
            .province(UPDATED_PROVINCE)
            .tel(UPDATED_TEL)
            .deuxiemeTel(UPDATED_DEUXIEME_TEL)
            .photo(UPDATED_PHOTO)
            .photoContentType(UPDATED_PHOTO_CONTENT_TYPE)
            .testAdmission(UPDATED_TEST_ADMISSION)
            .testAdmissionContentType(UPDATED_TEST_ADMISSION_CONTENT_TYPE)
            .relevesNotes(UPDATED_RELEVES_NOTES)
            .relevesNotesContentType(UPDATED_RELEVES_NOTES_CONTENT_TYPE)
            .bacalaureat(UPDATED_BACALAUREAT)
            .bacalaureatContentType(UPDATED_BACALAUREAT_CONTENT_TYPE)
            .cinPassport(UPDATED_CIN_PASSPORT)
            .cinPassportContentType(UPDATED_CIN_PASSPORT_CONTENT_TYPE)
            .diplome(UPDATED_DIPLOME)
            .diplomeContentType(UPDATED_DIPLOME_CONTENT_TYPE)
            .inscriptionvalide(UPDATED_INSCRIPTIONVALIDE)
            .absent(UPDATED_ABSENT)
            .etablissementObtention(UPDATED_ETABLISSEMENT_OBTENTION);
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
        assertThat(testEtudiantsMaster.getAnneeObtention()).isEqualTo(DEFAULT_ANNEE_OBTENTION);
        assertThat(testEtudiantsMaster.getCinPass()).isEqualTo(DEFAULT_CIN_PASS);
        assertThat(testEtudiantsMaster.getPaysNationalite()).isEqualTo(DEFAULT_PAYS_NATIONALITE);
        assertThat(testEtudiantsMaster.getPaysResidence()).isEqualTo(DEFAULT_PAYS_RESIDENCE);
        assertThat(testEtudiantsMaster.getCodepostal()).isEqualTo(DEFAULT_CODEPOSTAL);
        assertThat(testEtudiantsMaster.getProvince()).isEqualTo(DEFAULT_PROVINCE);
        assertThat(testEtudiantsMaster.getTel()).isEqualTo(DEFAULT_TEL);
        assertThat(testEtudiantsMaster.getDeuxiemeTel()).isEqualTo(DEFAULT_DEUXIEME_TEL);
        assertThat(testEtudiantsMaster.getPhoto()).isEqualTo(DEFAULT_PHOTO);
        assertThat(testEtudiantsMaster.getPhotoContentType()).isEqualTo(DEFAULT_PHOTO_CONTENT_TYPE);
        assertThat(testEtudiantsMaster.getTestAdmission()).isEqualTo(DEFAULT_TEST_ADMISSION);
        assertThat(testEtudiantsMaster.getTestAdmissionContentType()).isEqualTo(DEFAULT_TEST_ADMISSION_CONTENT_TYPE);
        assertThat(testEtudiantsMaster.getRelevesNotes()).isEqualTo(DEFAULT_RELEVES_NOTES);
        assertThat(testEtudiantsMaster.getRelevesNotesContentType()).isEqualTo(DEFAULT_RELEVES_NOTES_CONTENT_TYPE);
        assertThat(testEtudiantsMaster.getBacalaureat()).isEqualTo(DEFAULT_BACALAUREAT);
        assertThat(testEtudiantsMaster.getBacalaureatContentType()).isEqualTo(DEFAULT_BACALAUREAT_CONTENT_TYPE);
        assertThat(testEtudiantsMaster.getCinPassport()).isEqualTo(DEFAULT_CIN_PASSPORT);
        assertThat(testEtudiantsMaster.getCinPassportContentType()).isEqualTo(DEFAULT_CIN_PASSPORT_CONTENT_TYPE);
        assertThat(testEtudiantsMaster.getDiplome()).isEqualTo(DEFAULT_DIPLOME);
        assertThat(testEtudiantsMaster.getDiplomeContentType()).isEqualTo(DEFAULT_DIPLOME_CONTENT_TYPE);
        assertThat(testEtudiantsMaster.isInscriptionvalide()).isEqualTo(DEFAULT_INSCRIPTIONVALIDE);
        assertThat(testEtudiantsMaster.isAbsent()).isEqualTo(DEFAULT_ABSENT);
        assertThat(testEtudiantsMaster.getEtablissementObtention()).isEqualTo(DEFAULT_ETABLISSEMENT_OBTENTION);
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
            .andExpect(jsonPath("$.[*].anneeObtention").value(hasItem(DEFAULT_ANNEE_OBTENTION.toString())))
            .andExpect(jsonPath("$.[*].cinPass").value(hasItem(DEFAULT_CIN_PASS.toString())))
            .andExpect(jsonPath("$.[*].paysNationalite").value(hasItem(DEFAULT_PAYS_NATIONALITE.toString())))
            .andExpect(jsonPath("$.[*].paysResidence").value(hasItem(DEFAULT_PAYS_RESIDENCE.toString())))
            .andExpect(jsonPath("$.[*].codepostal").value(hasItem(DEFAULT_CODEPOSTAL.toString())))
            .andExpect(jsonPath("$.[*].province").value(hasItem(DEFAULT_PROVINCE.toString())))
            .andExpect(jsonPath("$.[*].tel").value(hasItem(DEFAULT_TEL)))
            .andExpect(jsonPath("$.[*].deuxiemeTel").value(hasItem(DEFAULT_DEUXIEME_TEL)))
            .andExpect(jsonPath("$.[*].photoContentType").value(hasItem(DEFAULT_PHOTO_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].photo").value(hasItem(Base64Utils.encodeToString(DEFAULT_PHOTO))))
            .andExpect(jsonPath("$.[*].testAdmissionContentType").value(hasItem(DEFAULT_TEST_ADMISSION_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].testAdmission").value(hasItem(Base64Utils.encodeToString(DEFAULT_TEST_ADMISSION))))
            .andExpect(jsonPath("$.[*].relevesNotesContentType").value(hasItem(DEFAULT_RELEVES_NOTES_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].relevesNotes").value(hasItem(Base64Utils.encodeToString(DEFAULT_RELEVES_NOTES))))
            .andExpect(jsonPath("$.[*].bacalaureatContentType").value(hasItem(DEFAULT_BACALAUREAT_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].bacalaureat").value(hasItem(Base64Utils.encodeToString(DEFAULT_BACALAUREAT))))
            .andExpect(jsonPath("$.[*].cinPassportContentType").value(hasItem(DEFAULT_CIN_PASSPORT_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].cinPassport").value(hasItem(Base64Utils.encodeToString(DEFAULT_CIN_PASSPORT))))
            .andExpect(jsonPath("$.[*].diplomeContentType").value(hasItem(DEFAULT_DIPLOME_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].diplome").value(hasItem(Base64Utils.encodeToString(DEFAULT_DIPLOME))))
            .andExpect(jsonPath("$.[*].inscriptionvalide").value(hasItem(DEFAULT_INSCRIPTIONVALIDE.booleanValue())))
            .andExpect(jsonPath("$.[*].absent").value(hasItem(DEFAULT_ABSENT.booleanValue())))
            .andExpect(jsonPath("$.[*].etablissementObtention").value(hasItem(DEFAULT_ETABLISSEMENT_OBTENTION.toString())));
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
            .andExpect(jsonPath("$.anneeObtention").value(DEFAULT_ANNEE_OBTENTION.toString()))
            .andExpect(jsonPath("$.cinPass").value(DEFAULT_CIN_PASS.toString()))
            .andExpect(jsonPath("$.paysNationalite").value(DEFAULT_PAYS_NATIONALITE.toString()))
            .andExpect(jsonPath("$.paysResidence").value(DEFAULT_PAYS_RESIDENCE.toString()))
            .andExpect(jsonPath("$.codepostal").value(DEFAULT_CODEPOSTAL.toString()))
            .andExpect(jsonPath("$.province").value(DEFAULT_PROVINCE.toString()))
            .andExpect(jsonPath("$.tel").value(DEFAULT_TEL))
            .andExpect(jsonPath("$.deuxiemeTel").value(DEFAULT_DEUXIEME_TEL))
            .andExpect(jsonPath("$.photoContentType").value(DEFAULT_PHOTO_CONTENT_TYPE))
            .andExpect(jsonPath("$.photo").value(Base64Utils.encodeToString(DEFAULT_PHOTO)))
            .andExpect(jsonPath("$.testAdmissionContentType").value(DEFAULT_TEST_ADMISSION_CONTENT_TYPE))
            .andExpect(jsonPath("$.testAdmission").value(Base64Utils.encodeToString(DEFAULT_TEST_ADMISSION)))
            .andExpect(jsonPath("$.relevesNotesContentType").value(DEFAULT_RELEVES_NOTES_CONTENT_TYPE))
            .andExpect(jsonPath("$.relevesNotes").value(Base64Utils.encodeToString(DEFAULT_RELEVES_NOTES)))
            .andExpect(jsonPath("$.bacalaureatContentType").value(DEFAULT_BACALAUREAT_CONTENT_TYPE))
            .andExpect(jsonPath("$.bacalaureat").value(Base64Utils.encodeToString(DEFAULT_BACALAUREAT)))
            .andExpect(jsonPath("$.cinPassportContentType").value(DEFAULT_CIN_PASSPORT_CONTENT_TYPE))
            .andExpect(jsonPath("$.cinPassport").value(Base64Utils.encodeToString(DEFAULT_CIN_PASSPORT)))
            .andExpect(jsonPath("$.diplomeContentType").value(DEFAULT_DIPLOME_CONTENT_TYPE))
            .andExpect(jsonPath("$.diplome").value(Base64Utils.encodeToString(DEFAULT_DIPLOME)))
            .andExpect(jsonPath("$.inscriptionvalide").value(DEFAULT_INSCRIPTIONVALIDE.booleanValue()))
            .andExpect(jsonPath("$.absent").value(DEFAULT_ABSENT.booleanValue()))
            .andExpect(jsonPath("$.etablissementObtention").value(DEFAULT_ETABLISSEMENT_OBTENTION.toString()));
    }

    @Test
    @Transactional
    public void getAllEtudiantsMastersBySuffixeIsEqualToSomething() throws Exception {
        // Initialize the database
        etudiantsMasterRepository.saveAndFlush(etudiantsMaster);

        // Get all the etudiantsMasterList where suffixe equals to DEFAULT_SUFFIXE
        defaultEtudiantsMasterShouldBeFound("suffixe.equals=" + DEFAULT_SUFFIXE);

        // Get all the etudiantsMasterList where suffixe equals to UPDATED_SUFFIXE
        defaultEtudiantsMasterShouldNotBeFound("suffixe.equals=" + UPDATED_SUFFIXE);
    }

    @Test
    @Transactional
    public void getAllEtudiantsMastersBySuffixeIsInShouldWork() throws Exception {
        // Initialize the database
        etudiantsMasterRepository.saveAndFlush(etudiantsMaster);

        // Get all the etudiantsMasterList where suffixe in DEFAULT_SUFFIXE or UPDATED_SUFFIXE
        defaultEtudiantsMasterShouldBeFound("suffixe.in=" + DEFAULT_SUFFIXE + "," + UPDATED_SUFFIXE);

        // Get all the etudiantsMasterList where suffixe equals to UPDATED_SUFFIXE
        defaultEtudiantsMasterShouldNotBeFound("suffixe.in=" + UPDATED_SUFFIXE);
    }

    @Test
    @Transactional
    public void getAllEtudiantsMastersBySuffixeIsNullOrNotNull() throws Exception {
        // Initialize the database
        etudiantsMasterRepository.saveAndFlush(etudiantsMaster);

        // Get all the etudiantsMasterList where suffixe is not null
        defaultEtudiantsMasterShouldBeFound("suffixe.specified=true");

        // Get all the etudiantsMasterList where suffixe is null
        defaultEtudiantsMasterShouldNotBeFound("suffixe.specified=false");
    }

    @Test
    @Transactional
    public void getAllEtudiantsMastersByNomIsEqualToSomething() throws Exception {
        // Initialize the database
        etudiantsMasterRepository.saveAndFlush(etudiantsMaster);

        // Get all the etudiantsMasterList where nom equals to DEFAULT_NOM
        defaultEtudiantsMasterShouldBeFound("nom.equals=" + DEFAULT_NOM);

        // Get all the etudiantsMasterList where nom equals to UPDATED_NOM
        defaultEtudiantsMasterShouldNotBeFound("nom.equals=" + UPDATED_NOM);
    }

    @Test
    @Transactional
    public void getAllEtudiantsMastersByNomIsInShouldWork() throws Exception {
        // Initialize the database
        etudiantsMasterRepository.saveAndFlush(etudiantsMaster);

        // Get all the etudiantsMasterList where nom in DEFAULT_NOM or UPDATED_NOM
        defaultEtudiantsMasterShouldBeFound("nom.in=" + DEFAULT_NOM + "," + UPDATED_NOM);

        // Get all the etudiantsMasterList where nom equals to UPDATED_NOM
        defaultEtudiantsMasterShouldNotBeFound("nom.in=" + UPDATED_NOM);
    }

    @Test
    @Transactional
    public void getAllEtudiantsMastersByNomIsNullOrNotNull() throws Exception {
        // Initialize the database
        etudiantsMasterRepository.saveAndFlush(etudiantsMaster);

        // Get all the etudiantsMasterList where nom is not null
        defaultEtudiantsMasterShouldBeFound("nom.specified=true");

        // Get all the etudiantsMasterList where nom is null
        defaultEtudiantsMasterShouldNotBeFound("nom.specified=false");
    }

    @Test
    @Transactional
    public void getAllEtudiantsMastersByPrenomIsEqualToSomething() throws Exception {
        // Initialize the database
        etudiantsMasterRepository.saveAndFlush(etudiantsMaster);

        // Get all the etudiantsMasterList where prenom equals to DEFAULT_PRENOM
        defaultEtudiantsMasterShouldBeFound("prenom.equals=" + DEFAULT_PRENOM);

        // Get all the etudiantsMasterList where prenom equals to UPDATED_PRENOM
        defaultEtudiantsMasterShouldNotBeFound("prenom.equals=" + UPDATED_PRENOM);
    }

    @Test
    @Transactional
    public void getAllEtudiantsMastersByPrenomIsInShouldWork() throws Exception {
        // Initialize the database
        etudiantsMasterRepository.saveAndFlush(etudiantsMaster);

        // Get all the etudiantsMasterList where prenom in DEFAULT_PRENOM or UPDATED_PRENOM
        defaultEtudiantsMasterShouldBeFound("prenom.in=" + DEFAULT_PRENOM + "," + UPDATED_PRENOM);

        // Get all the etudiantsMasterList where prenom equals to UPDATED_PRENOM
        defaultEtudiantsMasterShouldNotBeFound("prenom.in=" + UPDATED_PRENOM);
    }

    @Test
    @Transactional
    public void getAllEtudiantsMastersByPrenomIsNullOrNotNull() throws Exception {
        // Initialize the database
        etudiantsMasterRepository.saveAndFlush(etudiantsMaster);

        // Get all the etudiantsMasterList where prenom is not null
        defaultEtudiantsMasterShouldBeFound("prenom.specified=true");

        // Get all the etudiantsMasterList where prenom is null
        defaultEtudiantsMasterShouldNotBeFound("prenom.specified=false");
    }

    @Test
    @Transactional
    public void getAllEtudiantsMastersByDateNaissanceIsEqualToSomething() throws Exception {
        // Initialize the database
        etudiantsMasterRepository.saveAndFlush(etudiantsMaster);

        // Get all the etudiantsMasterList where dateNaissance equals to DEFAULT_DATE_NAISSANCE
        defaultEtudiantsMasterShouldBeFound("dateNaissance.equals=" + DEFAULT_DATE_NAISSANCE);

        // Get all the etudiantsMasterList where dateNaissance equals to UPDATED_DATE_NAISSANCE
        defaultEtudiantsMasterShouldNotBeFound("dateNaissance.equals=" + UPDATED_DATE_NAISSANCE);
    }

    @Test
    @Transactional
    public void getAllEtudiantsMastersByDateNaissanceIsInShouldWork() throws Exception {
        // Initialize the database
        etudiantsMasterRepository.saveAndFlush(etudiantsMaster);

        // Get all the etudiantsMasterList where dateNaissance in DEFAULT_DATE_NAISSANCE or UPDATED_DATE_NAISSANCE
        defaultEtudiantsMasterShouldBeFound("dateNaissance.in=" + DEFAULT_DATE_NAISSANCE + "," + UPDATED_DATE_NAISSANCE);

        // Get all the etudiantsMasterList where dateNaissance equals to UPDATED_DATE_NAISSANCE
        defaultEtudiantsMasterShouldNotBeFound("dateNaissance.in=" + UPDATED_DATE_NAISSANCE);
    }

    @Test
    @Transactional
    public void getAllEtudiantsMastersByDateNaissanceIsNullOrNotNull() throws Exception {
        // Initialize the database
        etudiantsMasterRepository.saveAndFlush(etudiantsMaster);

        // Get all the etudiantsMasterList where dateNaissance is not null
        defaultEtudiantsMasterShouldBeFound("dateNaissance.specified=true");

        // Get all the etudiantsMasterList where dateNaissance is null
        defaultEtudiantsMasterShouldNotBeFound("dateNaissance.specified=false");
    }

    @Test
    @Transactional
    public void getAllEtudiantsMastersByAdresseContactIsEqualToSomething() throws Exception {
        // Initialize the database
        etudiantsMasterRepository.saveAndFlush(etudiantsMaster);

        // Get all the etudiantsMasterList where adresseContact equals to DEFAULT_ADRESSE_CONTACT
        defaultEtudiantsMasterShouldBeFound("adresseContact.equals=" + DEFAULT_ADRESSE_CONTACT);

        // Get all the etudiantsMasterList where adresseContact equals to UPDATED_ADRESSE_CONTACT
        defaultEtudiantsMasterShouldNotBeFound("adresseContact.equals=" + UPDATED_ADRESSE_CONTACT);
    }

    @Test
    @Transactional
    public void getAllEtudiantsMastersByAdresseContactIsInShouldWork() throws Exception {
        // Initialize the database
        etudiantsMasterRepository.saveAndFlush(etudiantsMaster);

        // Get all the etudiantsMasterList where adresseContact in DEFAULT_ADRESSE_CONTACT or UPDATED_ADRESSE_CONTACT
        defaultEtudiantsMasterShouldBeFound("adresseContact.in=" + DEFAULT_ADRESSE_CONTACT + "," + UPDATED_ADRESSE_CONTACT);

        // Get all the etudiantsMasterList where adresseContact equals to UPDATED_ADRESSE_CONTACT
        defaultEtudiantsMasterShouldNotBeFound("adresseContact.in=" + UPDATED_ADRESSE_CONTACT);
    }

    @Test
    @Transactional
    public void getAllEtudiantsMastersByAdresseContactIsNullOrNotNull() throws Exception {
        // Initialize the database
        etudiantsMasterRepository.saveAndFlush(etudiantsMaster);

        // Get all the etudiantsMasterList where adresseContact is not null
        defaultEtudiantsMasterShouldBeFound("adresseContact.specified=true");

        // Get all the etudiantsMasterList where adresseContact is null
        defaultEtudiantsMasterShouldNotBeFound("adresseContact.specified=false");
    }

    @Test
    @Transactional
    public void getAllEtudiantsMastersByVilleIsEqualToSomething() throws Exception {
        // Initialize the database
        etudiantsMasterRepository.saveAndFlush(etudiantsMaster);

        // Get all the etudiantsMasterList where ville equals to DEFAULT_VILLE
        defaultEtudiantsMasterShouldBeFound("ville.equals=" + DEFAULT_VILLE);

        // Get all the etudiantsMasterList where ville equals to UPDATED_VILLE
        defaultEtudiantsMasterShouldNotBeFound("ville.equals=" + UPDATED_VILLE);
    }

    @Test
    @Transactional
    public void getAllEtudiantsMastersByVilleIsInShouldWork() throws Exception {
        // Initialize the database
        etudiantsMasterRepository.saveAndFlush(etudiantsMaster);

        // Get all the etudiantsMasterList where ville in DEFAULT_VILLE or UPDATED_VILLE
        defaultEtudiantsMasterShouldBeFound("ville.in=" + DEFAULT_VILLE + "," + UPDATED_VILLE);

        // Get all the etudiantsMasterList where ville equals to UPDATED_VILLE
        defaultEtudiantsMasterShouldNotBeFound("ville.in=" + UPDATED_VILLE);
    }

    @Test
    @Transactional
    public void getAllEtudiantsMastersByVilleIsNullOrNotNull() throws Exception {
        // Initialize the database
        etudiantsMasterRepository.saveAndFlush(etudiantsMaster);

        // Get all the etudiantsMasterList where ville is not null
        defaultEtudiantsMasterShouldBeFound("ville.specified=true");

        // Get all the etudiantsMasterList where ville is null
        defaultEtudiantsMasterShouldNotBeFound("ville.specified=false");
    }

    @Test
    @Transactional
    public void getAllEtudiantsMastersByEmailIsEqualToSomething() throws Exception {
        // Initialize the database
        etudiantsMasterRepository.saveAndFlush(etudiantsMaster);

        // Get all the etudiantsMasterList where email equals to DEFAULT_EMAIL
        defaultEtudiantsMasterShouldBeFound("email.equals=" + DEFAULT_EMAIL);

        // Get all the etudiantsMasterList where email equals to UPDATED_EMAIL
        defaultEtudiantsMasterShouldNotBeFound("email.equals=" + UPDATED_EMAIL);
    }

    @Test
    @Transactional
    public void getAllEtudiantsMastersByEmailIsInShouldWork() throws Exception {
        // Initialize the database
        etudiantsMasterRepository.saveAndFlush(etudiantsMaster);

        // Get all the etudiantsMasterList where email in DEFAULT_EMAIL or UPDATED_EMAIL
        defaultEtudiantsMasterShouldBeFound("email.in=" + DEFAULT_EMAIL + "," + UPDATED_EMAIL);

        // Get all the etudiantsMasterList where email equals to UPDATED_EMAIL
        defaultEtudiantsMasterShouldNotBeFound("email.in=" + UPDATED_EMAIL);
    }

    @Test
    @Transactional
    public void getAllEtudiantsMastersByEmailIsNullOrNotNull() throws Exception {
        // Initialize the database
        etudiantsMasterRepository.saveAndFlush(etudiantsMaster);

        // Get all the etudiantsMasterList where email is not null
        defaultEtudiantsMasterShouldBeFound("email.specified=true");

        // Get all the etudiantsMasterList where email is null
        defaultEtudiantsMasterShouldNotBeFound("email.specified=false");
    }

    @Test
    @Transactional
    public void getAllEtudiantsMastersByTypeBacIsEqualToSomething() throws Exception {
        // Initialize the database
        etudiantsMasterRepository.saveAndFlush(etudiantsMaster);

        // Get all the etudiantsMasterList where typeBac equals to DEFAULT_TYPE_BAC
        defaultEtudiantsMasterShouldBeFound("typeBac.equals=" + DEFAULT_TYPE_BAC);

        // Get all the etudiantsMasterList where typeBac equals to UPDATED_TYPE_BAC
        defaultEtudiantsMasterShouldNotBeFound("typeBac.equals=" + UPDATED_TYPE_BAC);
    }

    @Test
    @Transactional
    public void getAllEtudiantsMastersByTypeBacIsInShouldWork() throws Exception {
        // Initialize the database
        etudiantsMasterRepository.saveAndFlush(etudiantsMaster);

        // Get all the etudiantsMasterList where typeBac in DEFAULT_TYPE_BAC or UPDATED_TYPE_BAC
        defaultEtudiantsMasterShouldBeFound("typeBac.in=" + DEFAULT_TYPE_BAC + "," + UPDATED_TYPE_BAC);

        // Get all the etudiantsMasterList where typeBac equals to UPDATED_TYPE_BAC
        defaultEtudiantsMasterShouldNotBeFound("typeBac.in=" + UPDATED_TYPE_BAC);
    }

    @Test
    @Transactional
    public void getAllEtudiantsMastersByTypeBacIsNullOrNotNull() throws Exception {
        // Initialize the database
        etudiantsMasterRepository.saveAndFlush(etudiantsMaster);

        // Get all the etudiantsMasterList where typeBac is not null
        defaultEtudiantsMasterShouldBeFound("typeBac.specified=true");

        // Get all the etudiantsMasterList where typeBac is null
        defaultEtudiantsMasterShouldNotBeFound("typeBac.specified=false");
    }

    @Test
    @Transactional
    public void getAllEtudiantsMastersByMentionIsEqualToSomething() throws Exception {
        // Initialize the database
        etudiantsMasterRepository.saveAndFlush(etudiantsMaster);

        // Get all the etudiantsMasterList where mention equals to DEFAULT_MENTION
        defaultEtudiantsMasterShouldBeFound("mention.equals=" + DEFAULT_MENTION);

        // Get all the etudiantsMasterList where mention equals to UPDATED_MENTION
        defaultEtudiantsMasterShouldNotBeFound("mention.equals=" + UPDATED_MENTION);
    }

    @Test
    @Transactional
    public void getAllEtudiantsMastersByMentionIsInShouldWork() throws Exception {
        // Initialize the database
        etudiantsMasterRepository.saveAndFlush(etudiantsMaster);

        // Get all the etudiantsMasterList where mention in DEFAULT_MENTION or UPDATED_MENTION
        defaultEtudiantsMasterShouldBeFound("mention.in=" + DEFAULT_MENTION + "," + UPDATED_MENTION);

        // Get all the etudiantsMasterList where mention equals to UPDATED_MENTION
        defaultEtudiantsMasterShouldNotBeFound("mention.in=" + UPDATED_MENTION);
    }

    @Test
    @Transactional
    public void getAllEtudiantsMastersByMentionIsNullOrNotNull() throws Exception {
        // Initialize the database
        etudiantsMasterRepository.saveAndFlush(etudiantsMaster);

        // Get all the etudiantsMasterList where mention is not null
        defaultEtudiantsMasterShouldBeFound("mention.specified=true");

        // Get all the etudiantsMasterList where mention is null
        defaultEtudiantsMasterShouldNotBeFound("mention.specified=false");
    }

    @Test
    @Transactional
    public void getAllEtudiantsMastersByAnneeObtentionIsEqualToSomething() throws Exception {
        // Initialize the database
        etudiantsMasterRepository.saveAndFlush(etudiantsMaster);

        // Get all the etudiantsMasterList where anneeObtention equals to DEFAULT_ANNEE_OBTENTION
        defaultEtudiantsMasterShouldBeFound("anneeObtention.equals=" + DEFAULT_ANNEE_OBTENTION);

        // Get all the etudiantsMasterList where anneeObtention equals to UPDATED_ANNEE_OBTENTION
        defaultEtudiantsMasterShouldNotBeFound("anneeObtention.equals=" + UPDATED_ANNEE_OBTENTION);
    }

    @Test
    @Transactional
    public void getAllEtudiantsMastersByAnneeObtentionIsInShouldWork() throws Exception {
        // Initialize the database
        etudiantsMasterRepository.saveAndFlush(etudiantsMaster);

        // Get all the etudiantsMasterList where anneeObtention in DEFAULT_ANNEE_OBTENTION or UPDATED_ANNEE_OBTENTION
        defaultEtudiantsMasterShouldBeFound("anneeObtention.in=" + DEFAULT_ANNEE_OBTENTION + "," + UPDATED_ANNEE_OBTENTION);

        // Get all the etudiantsMasterList where anneeObtention equals to UPDATED_ANNEE_OBTENTION
        defaultEtudiantsMasterShouldNotBeFound("anneeObtention.in=" + UPDATED_ANNEE_OBTENTION);
    }

    @Test
    @Transactional
    public void getAllEtudiantsMastersByAnneeObtentionIsNullOrNotNull() throws Exception {
        // Initialize the database
        etudiantsMasterRepository.saveAndFlush(etudiantsMaster);

        // Get all the etudiantsMasterList where anneeObtention is not null
        defaultEtudiantsMasterShouldBeFound("anneeObtention.specified=true");

        // Get all the etudiantsMasterList where anneeObtention is null
        defaultEtudiantsMasterShouldNotBeFound("anneeObtention.specified=false");
    }

    @Test
    @Transactional
    public void getAllEtudiantsMastersByCinPassIsEqualToSomething() throws Exception {
        // Initialize the database
        etudiantsMasterRepository.saveAndFlush(etudiantsMaster);

        // Get all the etudiantsMasterList where cinPass equals to DEFAULT_CIN_PASS
        defaultEtudiantsMasterShouldBeFound("cinPass.equals=" + DEFAULT_CIN_PASS);

        // Get all the etudiantsMasterList where cinPass equals to UPDATED_CIN_PASS
        defaultEtudiantsMasterShouldNotBeFound("cinPass.equals=" + UPDATED_CIN_PASS);
    }

    @Test
    @Transactional
    public void getAllEtudiantsMastersByCinPassIsInShouldWork() throws Exception {
        // Initialize the database
        etudiantsMasterRepository.saveAndFlush(etudiantsMaster);

        // Get all the etudiantsMasterList where cinPass in DEFAULT_CIN_PASS or UPDATED_CIN_PASS
        defaultEtudiantsMasterShouldBeFound("cinPass.in=" + DEFAULT_CIN_PASS + "," + UPDATED_CIN_PASS);

        // Get all the etudiantsMasterList where cinPass equals to UPDATED_CIN_PASS
        defaultEtudiantsMasterShouldNotBeFound("cinPass.in=" + UPDATED_CIN_PASS);
    }

    @Test
    @Transactional
    public void getAllEtudiantsMastersByCinPassIsNullOrNotNull() throws Exception {
        // Initialize the database
        etudiantsMasterRepository.saveAndFlush(etudiantsMaster);

        // Get all the etudiantsMasterList where cinPass is not null
        defaultEtudiantsMasterShouldBeFound("cinPass.specified=true");

        // Get all the etudiantsMasterList where cinPass is null
        defaultEtudiantsMasterShouldNotBeFound("cinPass.specified=false");
    }

    @Test
    @Transactional
    public void getAllEtudiantsMastersByPaysNationaliteIsEqualToSomething() throws Exception {
        // Initialize the database
        etudiantsMasterRepository.saveAndFlush(etudiantsMaster);

        // Get all the etudiantsMasterList where paysNationalite equals to DEFAULT_PAYS_NATIONALITE
        defaultEtudiantsMasterShouldBeFound("paysNationalite.equals=" + DEFAULT_PAYS_NATIONALITE);

        // Get all the etudiantsMasterList where paysNationalite equals to UPDATED_PAYS_NATIONALITE
        defaultEtudiantsMasterShouldNotBeFound("paysNationalite.equals=" + UPDATED_PAYS_NATIONALITE);
    }

    @Test
    @Transactional
    public void getAllEtudiantsMastersByPaysNationaliteIsInShouldWork() throws Exception {
        // Initialize the database
        etudiantsMasterRepository.saveAndFlush(etudiantsMaster);

        // Get all the etudiantsMasterList where paysNationalite in DEFAULT_PAYS_NATIONALITE or UPDATED_PAYS_NATIONALITE
        defaultEtudiantsMasterShouldBeFound("paysNationalite.in=" + DEFAULT_PAYS_NATIONALITE + "," + UPDATED_PAYS_NATIONALITE);

        // Get all the etudiantsMasterList where paysNationalite equals to UPDATED_PAYS_NATIONALITE
        defaultEtudiantsMasterShouldNotBeFound("paysNationalite.in=" + UPDATED_PAYS_NATIONALITE);
    }

    @Test
    @Transactional
    public void getAllEtudiantsMastersByPaysNationaliteIsNullOrNotNull() throws Exception {
        // Initialize the database
        etudiantsMasterRepository.saveAndFlush(etudiantsMaster);

        // Get all the etudiantsMasterList where paysNationalite is not null
        defaultEtudiantsMasterShouldBeFound("paysNationalite.specified=true");

        // Get all the etudiantsMasterList where paysNationalite is null
        defaultEtudiantsMasterShouldNotBeFound("paysNationalite.specified=false");
    }

    @Test
    @Transactional
    public void getAllEtudiantsMastersByPaysResidenceIsEqualToSomething() throws Exception {
        // Initialize the database
        etudiantsMasterRepository.saveAndFlush(etudiantsMaster);

        // Get all the etudiantsMasterList where paysResidence equals to DEFAULT_PAYS_RESIDENCE
        defaultEtudiantsMasterShouldBeFound("paysResidence.equals=" + DEFAULT_PAYS_RESIDENCE);

        // Get all the etudiantsMasterList where paysResidence equals to UPDATED_PAYS_RESIDENCE
        defaultEtudiantsMasterShouldNotBeFound("paysResidence.equals=" + UPDATED_PAYS_RESIDENCE);
    }

    @Test
    @Transactional
    public void getAllEtudiantsMastersByPaysResidenceIsInShouldWork() throws Exception {
        // Initialize the database
        etudiantsMasterRepository.saveAndFlush(etudiantsMaster);

        // Get all the etudiantsMasterList where paysResidence in DEFAULT_PAYS_RESIDENCE or UPDATED_PAYS_RESIDENCE
        defaultEtudiantsMasterShouldBeFound("paysResidence.in=" + DEFAULT_PAYS_RESIDENCE + "," + UPDATED_PAYS_RESIDENCE);

        // Get all the etudiantsMasterList where paysResidence equals to UPDATED_PAYS_RESIDENCE
        defaultEtudiantsMasterShouldNotBeFound("paysResidence.in=" + UPDATED_PAYS_RESIDENCE);
    }

    @Test
    @Transactional
    public void getAllEtudiantsMastersByPaysResidenceIsNullOrNotNull() throws Exception {
        // Initialize the database
        etudiantsMasterRepository.saveAndFlush(etudiantsMaster);

        // Get all the etudiantsMasterList where paysResidence is not null
        defaultEtudiantsMasterShouldBeFound("paysResidence.specified=true");

        // Get all the etudiantsMasterList where paysResidence is null
        defaultEtudiantsMasterShouldNotBeFound("paysResidence.specified=false");
    }

    @Test
    @Transactional
    public void getAllEtudiantsMastersByCodepostalIsEqualToSomething() throws Exception {
        // Initialize the database
        etudiantsMasterRepository.saveAndFlush(etudiantsMaster);

        // Get all the etudiantsMasterList where codepostal equals to DEFAULT_CODEPOSTAL
        defaultEtudiantsMasterShouldBeFound("codepostal.equals=" + DEFAULT_CODEPOSTAL);

        // Get all the etudiantsMasterList where codepostal equals to UPDATED_CODEPOSTAL
        defaultEtudiantsMasterShouldNotBeFound("codepostal.equals=" + UPDATED_CODEPOSTAL);
    }

    @Test
    @Transactional
    public void getAllEtudiantsMastersByCodepostalIsInShouldWork() throws Exception {
        // Initialize the database
        etudiantsMasterRepository.saveAndFlush(etudiantsMaster);

        // Get all the etudiantsMasterList where codepostal in DEFAULT_CODEPOSTAL or UPDATED_CODEPOSTAL
        defaultEtudiantsMasterShouldBeFound("codepostal.in=" + DEFAULT_CODEPOSTAL + "," + UPDATED_CODEPOSTAL);

        // Get all the etudiantsMasterList where codepostal equals to UPDATED_CODEPOSTAL
        defaultEtudiantsMasterShouldNotBeFound("codepostal.in=" + UPDATED_CODEPOSTAL);
    }

    @Test
    @Transactional
    public void getAllEtudiantsMastersByCodepostalIsNullOrNotNull() throws Exception {
        // Initialize the database
        etudiantsMasterRepository.saveAndFlush(etudiantsMaster);

        // Get all the etudiantsMasterList where codepostal is not null
        defaultEtudiantsMasterShouldBeFound("codepostal.specified=true");

        // Get all the etudiantsMasterList where codepostal is null
        defaultEtudiantsMasterShouldNotBeFound("codepostal.specified=false");
    }

    @Test
    @Transactional
    public void getAllEtudiantsMastersByProvinceIsEqualToSomething() throws Exception {
        // Initialize the database
        etudiantsMasterRepository.saveAndFlush(etudiantsMaster);

        // Get all the etudiantsMasterList where province equals to DEFAULT_PROVINCE
        defaultEtudiantsMasterShouldBeFound("province.equals=" + DEFAULT_PROVINCE);

        // Get all the etudiantsMasterList where province equals to UPDATED_PROVINCE
        defaultEtudiantsMasterShouldNotBeFound("province.equals=" + UPDATED_PROVINCE);
    }

    @Test
    @Transactional
    public void getAllEtudiantsMastersByProvinceIsInShouldWork() throws Exception {
        // Initialize the database
        etudiantsMasterRepository.saveAndFlush(etudiantsMaster);

        // Get all the etudiantsMasterList where province in DEFAULT_PROVINCE or UPDATED_PROVINCE
        defaultEtudiantsMasterShouldBeFound("province.in=" + DEFAULT_PROVINCE + "," + UPDATED_PROVINCE);

        // Get all the etudiantsMasterList where province equals to UPDATED_PROVINCE
        defaultEtudiantsMasterShouldNotBeFound("province.in=" + UPDATED_PROVINCE);
    }

    @Test
    @Transactional
    public void getAllEtudiantsMastersByProvinceIsNullOrNotNull() throws Exception {
        // Initialize the database
        etudiantsMasterRepository.saveAndFlush(etudiantsMaster);

        // Get all the etudiantsMasterList where province is not null
        defaultEtudiantsMasterShouldBeFound("province.specified=true");

        // Get all the etudiantsMasterList where province is null
        defaultEtudiantsMasterShouldNotBeFound("province.specified=false");
    }

    @Test
    @Transactional
    public void getAllEtudiantsMastersByTelIsEqualToSomething() throws Exception {
        // Initialize the database
        etudiantsMasterRepository.saveAndFlush(etudiantsMaster);

        // Get all the etudiantsMasterList where tel equals to DEFAULT_TEL
        defaultEtudiantsMasterShouldBeFound("tel.equals=" + DEFAULT_TEL);

        // Get all the etudiantsMasterList where tel equals to UPDATED_TEL
        defaultEtudiantsMasterShouldNotBeFound("tel.equals=" + UPDATED_TEL);
    }

    @Test
    @Transactional
    public void getAllEtudiantsMastersByTelIsInShouldWork() throws Exception {
        // Initialize the database
        etudiantsMasterRepository.saveAndFlush(etudiantsMaster);

        // Get all the etudiantsMasterList where tel in DEFAULT_TEL or UPDATED_TEL
        defaultEtudiantsMasterShouldBeFound("tel.in=" + DEFAULT_TEL + "," + UPDATED_TEL);

        // Get all the etudiantsMasterList where tel equals to UPDATED_TEL
        defaultEtudiantsMasterShouldNotBeFound("tel.in=" + UPDATED_TEL);
    }

    @Test
    @Transactional
    public void getAllEtudiantsMastersByTelIsNullOrNotNull() throws Exception {
        // Initialize the database
        etudiantsMasterRepository.saveAndFlush(etudiantsMaster);

        // Get all the etudiantsMasterList where tel is not null
        defaultEtudiantsMasterShouldBeFound("tel.specified=true");

        // Get all the etudiantsMasterList where tel is null
        defaultEtudiantsMasterShouldNotBeFound("tel.specified=false");
    }

    @Test
    @Transactional
    public void getAllEtudiantsMastersByTelIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        etudiantsMasterRepository.saveAndFlush(etudiantsMaster);

        // Get all the etudiantsMasterList where tel greater than or equals to DEFAULT_TEL
        defaultEtudiantsMasterShouldBeFound("tel.greaterOrEqualThan=" + DEFAULT_TEL);

        // Get all the etudiantsMasterList where tel greater than or equals to UPDATED_TEL
        defaultEtudiantsMasterShouldNotBeFound("tel.greaterOrEqualThan=" + UPDATED_TEL);
    }

    @Test
    @Transactional
    public void getAllEtudiantsMastersByTelIsLessThanSomething() throws Exception {
        // Initialize the database
        etudiantsMasterRepository.saveAndFlush(etudiantsMaster);

        // Get all the etudiantsMasterList where tel less than or equals to DEFAULT_TEL
        defaultEtudiantsMasterShouldNotBeFound("tel.lessThan=" + DEFAULT_TEL);

        // Get all the etudiantsMasterList where tel less than or equals to UPDATED_TEL
        defaultEtudiantsMasterShouldBeFound("tel.lessThan=" + UPDATED_TEL);
    }


    @Test
    @Transactional
    public void getAllEtudiantsMastersByDeuxiemeTelIsEqualToSomething() throws Exception {
        // Initialize the database
        etudiantsMasterRepository.saveAndFlush(etudiantsMaster);

        // Get all the etudiantsMasterList where deuxiemeTel equals to DEFAULT_DEUXIEME_TEL
        defaultEtudiantsMasterShouldBeFound("deuxiemeTel.equals=" + DEFAULT_DEUXIEME_TEL);

        // Get all the etudiantsMasterList where deuxiemeTel equals to UPDATED_DEUXIEME_TEL
        defaultEtudiantsMasterShouldNotBeFound("deuxiemeTel.equals=" + UPDATED_DEUXIEME_TEL);
    }

    @Test
    @Transactional
    public void getAllEtudiantsMastersByDeuxiemeTelIsInShouldWork() throws Exception {
        // Initialize the database
        etudiantsMasterRepository.saveAndFlush(etudiantsMaster);

        // Get all the etudiantsMasterList where deuxiemeTel in DEFAULT_DEUXIEME_TEL or UPDATED_DEUXIEME_TEL
        defaultEtudiantsMasterShouldBeFound("deuxiemeTel.in=" + DEFAULT_DEUXIEME_TEL + "," + UPDATED_DEUXIEME_TEL);

        // Get all the etudiantsMasterList where deuxiemeTel equals to UPDATED_DEUXIEME_TEL
        defaultEtudiantsMasterShouldNotBeFound("deuxiemeTel.in=" + UPDATED_DEUXIEME_TEL);
    }

    @Test
    @Transactional
    public void getAllEtudiantsMastersByDeuxiemeTelIsNullOrNotNull() throws Exception {
        // Initialize the database
        etudiantsMasterRepository.saveAndFlush(etudiantsMaster);

        // Get all the etudiantsMasterList where deuxiemeTel is not null
        defaultEtudiantsMasterShouldBeFound("deuxiemeTel.specified=true");

        // Get all the etudiantsMasterList where deuxiemeTel is null
        defaultEtudiantsMasterShouldNotBeFound("deuxiemeTel.specified=false");
    }

    @Test
    @Transactional
    public void getAllEtudiantsMastersByDeuxiemeTelIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        etudiantsMasterRepository.saveAndFlush(etudiantsMaster);

        // Get all the etudiantsMasterList where deuxiemeTel greater than or equals to DEFAULT_DEUXIEME_TEL
        defaultEtudiantsMasterShouldBeFound("deuxiemeTel.greaterOrEqualThan=" + DEFAULT_DEUXIEME_TEL);

        // Get all the etudiantsMasterList where deuxiemeTel greater than or equals to UPDATED_DEUXIEME_TEL
        defaultEtudiantsMasterShouldNotBeFound("deuxiemeTel.greaterOrEqualThan=" + UPDATED_DEUXIEME_TEL);
    }

    @Test
    @Transactional
    public void getAllEtudiantsMastersByDeuxiemeTelIsLessThanSomething() throws Exception {
        // Initialize the database
        etudiantsMasterRepository.saveAndFlush(etudiantsMaster);

        // Get all the etudiantsMasterList where deuxiemeTel less than or equals to DEFAULT_DEUXIEME_TEL
        defaultEtudiantsMasterShouldNotBeFound("deuxiemeTel.lessThan=" + DEFAULT_DEUXIEME_TEL);

        // Get all the etudiantsMasterList where deuxiemeTel less than or equals to UPDATED_DEUXIEME_TEL
        defaultEtudiantsMasterShouldBeFound("deuxiemeTel.lessThan=" + UPDATED_DEUXIEME_TEL);
    }


    @Test
    @Transactional
    public void getAllEtudiantsMastersByInscriptionvalideIsEqualToSomething() throws Exception {
        // Initialize the database
        etudiantsMasterRepository.saveAndFlush(etudiantsMaster);

        // Get all the etudiantsMasterList where inscriptionvalide equals to DEFAULT_INSCRIPTIONVALIDE
        defaultEtudiantsMasterShouldBeFound("inscriptionvalide.equals=" + DEFAULT_INSCRIPTIONVALIDE);

        // Get all the etudiantsMasterList where inscriptionvalide equals to UPDATED_INSCRIPTIONVALIDE
        defaultEtudiantsMasterShouldNotBeFound("inscriptionvalide.equals=" + UPDATED_INSCRIPTIONVALIDE);
    }

    @Test
    @Transactional
    public void getAllEtudiantsMastersByInscriptionvalideIsInShouldWork() throws Exception {
        // Initialize the database
        etudiantsMasterRepository.saveAndFlush(etudiantsMaster);

        // Get all the etudiantsMasterList where inscriptionvalide in DEFAULT_INSCRIPTIONVALIDE or UPDATED_INSCRIPTIONVALIDE
        defaultEtudiantsMasterShouldBeFound("inscriptionvalide.in=" + DEFAULT_INSCRIPTIONVALIDE + "," + UPDATED_INSCRIPTIONVALIDE);

        // Get all the etudiantsMasterList where inscriptionvalide equals to UPDATED_INSCRIPTIONVALIDE
        defaultEtudiantsMasterShouldNotBeFound("inscriptionvalide.in=" + UPDATED_INSCRIPTIONVALIDE);
    }

    @Test
    @Transactional
    public void getAllEtudiantsMastersByInscriptionvalideIsNullOrNotNull() throws Exception {
        // Initialize the database
        etudiantsMasterRepository.saveAndFlush(etudiantsMaster);

        // Get all the etudiantsMasterList where inscriptionvalide is not null
        defaultEtudiantsMasterShouldBeFound("inscriptionvalide.specified=true");

        // Get all the etudiantsMasterList where inscriptionvalide is null
        defaultEtudiantsMasterShouldNotBeFound("inscriptionvalide.specified=false");
    }

    @Test
    @Transactional
    public void getAllEtudiantsMastersByAbsentIsEqualToSomething() throws Exception {
        // Initialize the database
        etudiantsMasterRepository.saveAndFlush(etudiantsMaster);

        // Get all the etudiantsMasterList where absent equals to DEFAULT_ABSENT
        defaultEtudiantsMasterShouldBeFound("absent.equals=" + DEFAULT_ABSENT);

        // Get all the etudiantsMasterList where absent equals to UPDATED_ABSENT
        defaultEtudiantsMasterShouldNotBeFound("absent.equals=" + UPDATED_ABSENT);
    }

    @Test
    @Transactional
    public void getAllEtudiantsMastersByAbsentIsInShouldWork() throws Exception {
        // Initialize the database
        etudiantsMasterRepository.saveAndFlush(etudiantsMaster);

        // Get all the etudiantsMasterList where absent in DEFAULT_ABSENT or UPDATED_ABSENT
        defaultEtudiantsMasterShouldBeFound("absent.in=" + DEFAULT_ABSENT + "," + UPDATED_ABSENT);

        // Get all the etudiantsMasterList where absent equals to UPDATED_ABSENT
        defaultEtudiantsMasterShouldNotBeFound("absent.in=" + UPDATED_ABSENT);
    }

    @Test
    @Transactional
    public void getAllEtudiantsMastersByAbsentIsNullOrNotNull() throws Exception {
        // Initialize the database
        etudiantsMasterRepository.saveAndFlush(etudiantsMaster);

        // Get all the etudiantsMasterList where absent is not null
        defaultEtudiantsMasterShouldBeFound("absent.specified=true");

        // Get all the etudiantsMasterList where absent is null
        defaultEtudiantsMasterShouldNotBeFound("absent.specified=false");
    }

    @Test
    @Transactional
    public void getAllEtudiantsMastersByEtablissementObtentionIsEqualToSomething() throws Exception {
        // Initialize the database
        etudiantsMasterRepository.saveAndFlush(etudiantsMaster);

        // Get all the etudiantsMasterList where etablissementObtention equals to DEFAULT_ETABLISSEMENT_OBTENTION
        defaultEtudiantsMasterShouldBeFound("etablissementObtention.equals=" + DEFAULT_ETABLISSEMENT_OBTENTION);

        // Get all the etudiantsMasterList where etablissementObtention equals to UPDATED_ETABLISSEMENT_OBTENTION
        defaultEtudiantsMasterShouldNotBeFound("etablissementObtention.equals=" + UPDATED_ETABLISSEMENT_OBTENTION);
    }

    @Test
    @Transactional
    public void getAllEtudiantsMastersByEtablissementObtentionIsInShouldWork() throws Exception {
        // Initialize the database
        etudiantsMasterRepository.saveAndFlush(etudiantsMaster);

        // Get all the etudiantsMasterList where etablissementObtention in DEFAULT_ETABLISSEMENT_OBTENTION or UPDATED_ETABLISSEMENT_OBTENTION
        defaultEtudiantsMasterShouldBeFound("etablissementObtention.in=" + DEFAULT_ETABLISSEMENT_OBTENTION + "," + UPDATED_ETABLISSEMENT_OBTENTION);

        // Get all the etudiantsMasterList where etablissementObtention equals to UPDATED_ETABLISSEMENT_OBTENTION
        defaultEtudiantsMasterShouldNotBeFound("etablissementObtention.in=" + UPDATED_ETABLISSEMENT_OBTENTION);
    }

    @Test
    @Transactional
    public void getAllEtudiantsMastersByEtablissementObtentionIsNullOrNotNull() throws Exception {
        // Initialize the database
        etudiantsMasterRepository.saveAndFlush(etudiantsMaster);

        // Get all the etudiantsMasterList where etablissementObtention is not null
        defaultEtudiantsMasterShouldBeFound("etablissementObtention.specified=true");

        // Get all the etudiantsMasterList where etablissementObtention is null
        defaultEtudiantsMasterShouldNotBeFound("etablissementObtention.specified=false");
    }

    @Test
    @Transactional
    public void getAllEtudiantsMastersByUserIsEqualToSomething() throws Exception {
        // Initialize the database
        User user = UserResourceIT.createEntity(em);
        em.persist(user);
        em.flush();
        etudiantsMaster.setUser(user);
        etudiantsMasterRepository.saveAndFlush(etudiantsMaster);
        Long userId = user.getId();

        // Get all the etudiantsMasterList where user equals to userId
        defaultEtudiantsMasterShouldBeFound("userId.equals=" + userId);

        // Get all the etudiantsMasterList where user equals to userId + 1
        defaultEtudiantsMasterShouldNotBeFound("userId.equals=" + (userId + 1));
    }


    @Test
    @Transactional
    public void getAllEtudiantsMastersByAbsenceIsEqualToSomething() throws Exception {
        // Initialize the database
        Absence absence = AbsenceResourceIT.createEntity(em);
        em.persist(absence);
        em.flush();
        etudiantsMaster.addAbsence(absence);
        etudiantsMasterRepository.saveAndFlush(etudiantsMaster);
        Long absenceId = absence.getId();

        // Get all the etudiantsMasterList where absence equals to absenceId
        defaultEtudiantsMasterShouldBeFound("absenceId.equals=" + absenceId);

        // Get all the etudiantsMasterList where absence equals to absenceId + 1
        defaultEtudiantsMasterShouldNotBeFound("absenceId.equals=" + (absenceId + 1));
    }


    @Test
    @Transactional
    public void getAllEtudiantsMastersByEspaceEtudiantIsEqualToSomething() throws Exception {
        // Initialize the database
        EspaceEtudiant espaceEtudiant = EspaceEtudiantResourceIT.createEntity(em);
        em.persist(espaceEtudiant);
        em.flush();
        etudiantsMaster.addEspaceEtudiant(espaceEtudiant);
        etudiantsMasterRepository.saveAndFlush(etudiantsMaster);
        Long espaceEtudiantId = espaceEtudiant.getId();

        // Get all the etudiantsMasterList where espaceEtudiant equals to espaceEtudiantId
        defaultEtudiantsMasterShouldBeFound("espaceEtudiantId.equals=" + espaceEtudiantId);

        // Get all the etudiantsMasterList where espaceEtudiant equals to espaceEtudiantId + 1
        defaultEtudiantsMasterShouldNotBeFound("espaceEtudiantId.equals=" + (espaceEtudiantId + 1));
    }


    @Test
    @Transactional
    public void getAllEtudiantsMastersByFiliereIsEqualToSomething() throws Exception {
        // Initialize the database
        Filiere filiere = FiliereResourceIT.createEntity(em);
        em.persist(filiere);
        em.flush();
        etudiantsMaster.setFiliere(filiere);
        etudiantsMasterRepository.saveAndFlush(etudiantsMaster);
        Long filiereId = filiere.getId();

        // Get all the etudiantsMasterList where filiere equals to filiereId
        defaultEtudiantsMasterShouldBeFound("filiereId.equals=" + filiereId);

        // Get all the etudiantsMasterList where filiere equals to filiereId + 1
        defaultEtudiantsMasterShouldNotBeFound("filiereId.equals=" + (filiereId + 1));
    }


    @Test
    @Transactional
    public void getAllEtudiantsMastersByAnneeInscriptionIsEqualToSomething() throws Exception {
        // Initialize the database
        AnneeInscription anneeInscription = AnneeInscriptionResourceIT.createEntity(em);
        em.persist(anneeInscription);
        em.flush();
        etudiantsMaster.setAnneeInscription(anneeInscription);
        etudiantsMasterRepository.saveAndFlush(etudiantsMaster);
        Long anneeInscriptionId = anneeInscription.getId();

        // Get all the etudiantsMasterList where anneeInscription equals to anneeInscriptionId
        defaultEtudiantsMasterShouldBeFound("anneeInscriptionId.equals=" + anneeInscriptionId);

        // Get all the etudiantsMasterList where anneeInscription equals to anneeInscriptionId + 1
        defaultEtudiantsMasterShouldNotBeFound("anneeInscriptionId.equals=" + (anneeInscriptionId + 1));
    }


    @Test
    @Transactional
    public void getAllEtudiantsMastersByModaliteIsEqualToSomething() throws Exception {
        // Initialize the database
        ModalitePaiement modalite = ModalitePaiementResourceIT.createEntity(em);
        em.persist(modalite);
        em.flush();
        etudiantsMaster.setModalite(modalite);
        etudiantsMasterRepository.saveAndFlush(etudiantsMaster);
        Long modaliteId = modalite.getId();

        // Get all the etudiantsMasterList where modalite equals to modaliteId
        defaultEtudiantsMasterShouldBeFound("modaliteId.equals=" + modaliteId);

        // Get all the etudiantsMasterList where modalite equals to modaliteId + 1
        defaultEtudiantsMasterShouldNotBeFound("modaliteId.equals=" + (modaliteId + 1));
    }

    /**
     * Executes the search, and checks that the default entity is returned.
     */
    private void defaultEtudiantsMasterShouldBeFound(String filter) throws Exception {
        restEtudiantsMasterMockMvc.perform(get("/api/etudiants-masters?sort=id,desc&" + filter))
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
            .andExpect(jsonPath("$.[*].anneeObtention").value(hasItem(DEFAULT_ANNEE_OBTENTION)))
            .andExpect(jsonPath("$.[*].cinPass").value(hasItem(DEFAULT_CIN_PASS)))
            .andExpect(jsonPath("$.[*].paysNationalite").value(hasItem(DEFAULT_PAYS_NATIONALITE)))
            .andExpect(jsonPath("$.[*].paysResidence").value(hasItem(DEFAULT_PAYS_RESIDENCE)))
            .andExpect(jsonPath("$.[*].codepostal").value(hasItem(DEFAULT_CODEPOSTAL)))
            .andExpect(jsonPath("$.[*].province").value(hasItem(DEFAULT_PROVINCE)))
            .andExpect(jsonPath("$.[*].tel").value(hasItem(DEFAULT_TEL)))
            .andExpect(jsonPath("$.[*].deuxiemeTel").value(hasItem(DEFAULT_DEUXIEME_TEL)))
            .andExpect(jsonPath("$.[*].photoContentType").value(hasItem(DEFAULT_PHOTO_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].photo").value(hasItem(Base64Utils.encodeToString(DEFAULT_PHOTO))))
            .andExpect(jsonPath("$.[*].testAdmissionContentType").value(hasItem(DEFAULT_TEST_ADMISSION_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].testAdmission").value(hasItem(Base64Utils.encodeToString(DEFAULT_TEST_ADMISSION))))
            .andExpect(jsonPath("$.[*].relevesNotesContentType").value(hasItem(DEFAULT_RELEVES_NOTES_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].relevesNotes").value(hasItem(Base64Utils.encodeToString(DEFAULT_RELEVES_NOTES))))
            .andExpect(jsonPath("$.[*].bacalaureatContentType").value(hasItem(DEFAULT_BACALAUREAT_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].bacalaureat").value(hasItem(Base64Utils.encodeToString(DEFAULT_BACALAUREAT))))
            .andExpect(jsonPath("$.[*].cinPassportContentType").value(hasItem(DEFAULT_CIN_PASSPORT_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].cinPassport").value(hasItem(Base64Utils.encodeToString(DEFAULT_CIN_PASSPORT))))
            .andExpect(jsonPath("$.[*].diplomeContentType").value(hasItem(DEFAULT_DIPLOME_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].diplome").value(hasItem(Base64Utils.encodeToString(DEFAULT_DIPLOME))))
            .andExpect(jsonPath("$.[*].inscriptionvalide").value(hasItem(DEFAULT_INSCRIPTIONVALIDE.booleanValue())))
            .andExpect(jsonPath("$.[*].absent").value(hasItem(DEFAULT_ABSENT.booleanValue())))
            .andExpect(jsonPath("$.[*].etablissementObtention").value(hasItem(DEFAULT_ETABLISSEMENT_OBTENTION)));

        // Check, that the count call also returns 1
        restEtudiantsMasterMockMvc.perform(get("/api/etudiants-masters/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(content().string("1"));
    }

    /**
     * Executes the search, and checks that the default entity is not returned.
     */
    private void defaultEtudiantsMasterShouldNotBeFound(String filter) throws Exception {
        restEtudiantsMasterMockMvc.perform(get("/api/etudiants-masters?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());

        // Check, that the count call also returns 0
        restEtudiantsMasterMockMvc.perform(get("/api/etudiants-masters/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(content().string("0"));
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
    	etudiantsMasterRepository.save(etudiantsMaster);

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
            .anneeObtention(UPDATED_ANNEE_OBTENTION)
            .cinPass(UPDATED_CIN_PASS)
            .paysNationalite(UPDATED_PAYS_NATIONALITE)
            .paysResidence(UPDATED_PAYS_RESIDENCE)
            .codepostal(UPDATED_CODEPOSTAL)
            .province(UPDATED_PROVINCE)
            .tel(UPDATED_TEL)
            .deuxiemeTel(UPDATED_DEUXIEME_TEL)
            .photo(UPDATED_PHOTO)
            .photoContentType(UPDATED_PHOTO_CONTENT_TYPE)
            .testAdmission(UPDATED_TEST_ADMISSION)
            .testAdmissionContentType(UPDATED_TEST_ADMISSION_CONTENT_TYPE)
            .relevesNotes(UPDATED_RELEVES_NOTES)
            .relevesNotesContentType(UPDATED_RELEVES_NOTES_CONTENT_TYPE)
            .bacalaureat(UPDATED_BACALAUREAT)
            .bacalaureatContentType(UPDATED_BACALAUREAT_CONTENT_TYPE)
            .cinPassport(UPDATED_CIN_PASSPORT)
            .cinPassportContentType(UPDATED_CIN_PASSPORT_CONTENT_TYPE)
            .diplome(UPDATED_DIPLOME)
            .diplomeContentType(UPDATED_DIPLOME_CONTENT_TYPE)
            .inscriptionvalide(UPDATED_INSCRIPTIONVALIDE)
            .absent(UPDATED_ABSENT)
            .etablissementObtention(UPDATED_ETABLISSEMENT_OBTENTION);

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
        assertThat(testEtudiantsMaster.getAnneeObtention()).isEqualTo(UPDATED_ANNEE_OBTENTION);
        assertThat(testEtudiantsMaster.getCinPass()).isEqualTo(UPDATED_CIN_PASS);
        assertThat(testEtudiantsMaster.getPaysNationalite()).isEqualTo(UPDATED_PAYS_NATIONALITE);
        assertThat(testEtudiantsMaster.getPaysResidence()).isEqualTo(UPDATED_PAYS_RESIDENCE);
        assertThat(testEtudiantsMaster.getCodepostal()).isEqualTo(UPDATED_CODEPOSTAL);
        assertThat(testEtudiantsMaster.getProvince()).isEqualTo(UPDATED_PROVINCE);
        assertThat(testEtudiantsMaster.getTel()).isEqualTo(UPDATED_TEL);
        assertThat(testEtudiantsMaster.getDeuxiemeTel()).isEqualTo(UPDATED_DEUXIEME_TEL);
        assertThat(testEtudiantsMaster.getPhoto()).isEqualTo(UPDATED_PHOTO);
        assertThat(testEtudiantsMaster.getPhotoContentType()).isEqualTo(UPDATED_PHOTO_CONTENT_TYPE);
        assertThat(testEtudiantsMaster.getTestAdmission()).isEqualTo(UPDATED_TEST_ADMISSION);
        assertThat(testEtudiantsMaster.getTestAdmissionContentType()).isEqualTo(UPDATED_TEST_ADMISSION_CONTENT_TYPE);
        assertThat(testEtudiantsMaster.getRelevesNotes()).isEqualTo(UPDATED_RELEVES_NOTES);
        assertThat(testEtudiantsMaster.getRelevesNotesContentType()).isEqualTo(UPDATED_RELEVES_NOTES_CONTENT_TYPE);
        assertThat(testEtudiantsMaster.getBacalaureat()).isEqualTo(UPDATED_BACALAUREAT);
        assertThat(testEtudiantsMaster.getBacalaureatContentType()).isEqualTo(UPDATED_BACALAUREAT_CONTENT_TYPE);
        assertThat(testEtudiantsMaster.getCinPassport()).isEqualTo(UPDATED_CIN_PASSPORT);
        assertThat(testEtudiantsMaster.getCinPassportContentType()).isEqualTo(UPDATED_CIN_PASSPORT_CONTENT_TYPE);
        assertThat(testEtudiantsMaster.getDiplome()).isEqualTo(UPDATED_DIPLOME);
        assertThat(testEtudiantsMaster.getDiplomeContentType()).isEqualTo(UPDATED_DIPLOME_CONTENT_TYPE);
        assertThat(testEtudiantsMaster.isInscriptionvalide()).isEqualTo(UPDATED_INSCRIPTIONVALIDE);
        assertThat(testEtudiantsMaster.isAbsent()).isEqualTo(UPDATED_ABSENT);
        assertThat(testEtudiantsMaster.getEtablissementObtention()).isEqualTo(UPDATED_ETABLISSEMENT_OBTENTION);
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
    }

    @Test
    @Transactional
    public void deleteEtudiantsMaster() throws Exception {
        // Initialize the database
    	etudiantsMasterRepository.save(etudiantsMaster);

        int databaseSizeBeforeDelete = etudiantsMasterRepository.findAll().size();

        // Delete the etudiantsMaster
        restEtudiantsMasterMockMvc.perform(delete("/api/etudiants-masters/{id}", etudiantsMaster.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<EtudiantsMaster> etudiantsMasterList = etudiantsMasterRepository.findAll();
        assertThat(etudiantsMasterList).hasSize(databaseSizeBeforeDelete - 1);
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
