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
import com.planeta.pfum.domain.EtudiantsExecutif;
import com.planeta.pfum.domain.enumeration.DiplomeBac;
import com.planeta.pfum.domain.enumeration.Mention;
import com.planeta.pfum.repository.EtudiantsExecutifRepository;
import com.planeta.pfum.web.rest.errors.ExceptionTranslator;
/**
 * Integration tests for the {@Link EtudiantsExecutifResource} REST controller.
 */
@SpringBootTest(classes = PfumApp.class)
public class EtudiantsExecutifResourceIT {

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

    private static final String DEFAULT_TEL = "AAAAAAAAAA";
    private static final String UPDATED_TEL =  "BBBBBBBBBB";

    private static final String DEFAULT_DEUXIEME_TEL = "AAAAAAAAAA";
    private static final String UPDATED_DEUXIEME_TEL =  "BBBBBBBBBB";

    private static final byte[] DEFAULT_PHOTO = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_PHOTO = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_PHOTO_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_PHOTO_CONTENT_TYPE = "image/png";

    private static final byte[] DEFAULT_CV = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_CV = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_CV_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_CV_CONTENT_TYPE = "image/png";

    private static final byte[] DEFAULT_AUTRE_DOCUMENT = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_AUTRE_DOCUMENT = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_AUTRE_DOCUMENT_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_AUTRE_DOCUMENT_CONTENT_TYPE = "image/png";

    private static final byte[] DEFAULT_ATTESTATION_DE_TRAVAIL = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_ATTESTATION_DE_TRAVAIL = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_ATTESTATION_DE_TRAVAIL_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_ATTESTATION_DE_TRAVAIL_CONTENT_TYPE = "image/png";

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
    private EtudiantsExecutifRepository etudiantsExecutifRepository;

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

    private MockMvc restEtudiantsExecutifMockMvc;

    private EtudiantsExecutif etudiantsExecutif;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EtudiantsExecutifResource etudiantsExecutifResource = new EtudiantsExecutifResource(etudiantsExecutifRepository);
        this.restEtudiantsExecutifMockMvc = MockMvcBuilders.standaloneSetup(etudiantsExecutifResource)
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
    public static EtudiantsExecutif createEntity(EntityManager em) {
        EtudiantsExecutif etudiantsExecutif = new EtudiantsExecutif()
            .suffixe(DEFAULT_SUFFIXE)
            .nom(DEFAULT_NOM)
            .prenom(DEFAULT_PRENOM)
            .dateNaissance(DEFAULT_DATE_NAISSANCE)
            .adresseContact(DEFAULT_ADRESSE_CONTACT)
            .ville(DEFAULT_VILLE)
            .email(DEFAULT_EMAIL)
            .pjBac(DEFAULT_PJ_BAC)
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
            .cv(DEFAULT_CV)
            .cvContentType(DEFAULT_CV_CONTENT_TYPE)
            .autreDocument(DEFAULT_AUTRE_DOCUMENT)
            .autreDocumentContentType(DEFAULT_AUTRE_DOCUMENT_CONTENT_TYPE)
            .attestationDeTravail(DEFAULT_ATTESTATION_DE_TRAVAIL)
            .attestationDeTravailContentType(DEFAULT_ATTESTATION_DE_TRAVAIL_CONTENT_TYPE)
            .bacalaureat(DEFAULT_BACALAUREAT)
            .bacalaureatContentType(DEFAULT_BACALAUREAT_CONTENT_TYPE)
            .cinPassport(DEFAULT_CIN_PASSPORT)
            .cinPassportContentType(DEFAULT_CIN_PASSPORT_CONTENT_TYPE)
            .diplome(DEFAULT_DIPLOME)
            .diplomeContentType(DEFAULT_DIPLOME_CONTENT_TYPE)
            .inscriptionvalide(DEFAULT_INSCRIPTIONVALIDE)
            .absent(DEFAULT_ABSENT);
        return etudiantsExecutif;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static EtudiantsExecutif createUpdatedEntity(EntityManager em) {
        EtudiantsExecutif etudiantsExecutif = new EtudiantsExecutif()
            .suffixe(UPDATED_SUFFIXE)
            .nom(UPDATED_NOM)
            .prenom(UPDATED_PRENOM)
            .dateNaissance(UPDATED_DATE_NAISSANCE)
            .adresseContact(UPDATED_ADRESSE_CONTACT)
            .ville(UPDATED_VILLE)
            .email(UPDATED_EMAIL)
            .pjBac(UPDATED_PJ_BAC)
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
            .cv(UPDATED_CV)
            .cvContentType(UPDATED_CV_CONTENT_TYPE)
            .autreDocument(UPDATED_AUTRE_DOCUMENT)
            .autreDocumentContentType(UPDATED_AUTRE_DOCUMENT_CONTENT_TYPE)
            .attestationDeTravail(UPDATED_ATTESTATION_DE_TRAVAIL)
            .attestationDeTravailContentType(UPDATED_ATTESTATION_DE_TRAVAIL_CONTENT_TYPE)
            .bacalaureat(UPDATED_BACALAUREAT)
            .bacalaureatContentType(UPDATED_BACALAUREAT_CONTENT_TYPE)
            .cinPassport(UPDATED_CIN_PASSPORT)
            .cinPassportContentType(UPDATED_CIN_PASSPORT_CONTENT_TYPE)
            .diplome(UPDATED_DIPLOME)
            .diplomeContentType(UPDATED_DIPLOME_CONTENT_TYPE)
            .inscriptionvalide(UPDATED_INSCRIPTIONVALIDE)
            .absent(UPDATED_ABSENT);
        return etudiantsExecutif;
    }

    @BeforeEach
    public void initTest() {
        etudiantsExecutif = createEntity(em);
    }

    @Test
    @Transactional
    public void createEtudiantsExecutif() throws Exception {
        int databaseSizeBeforeCreate = etudiantsExecutifRepository.findAll().size();

        // Create the EtudiantsExecutif
        restEtudiantsExecutifMockMvc.perform(post("/api/etudiants-executifs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(etudiantsExecutif)))
            .andExpect(status().isCreated());

        // Validate the EtudiantsExecutif in the database
        List<EtudiantsExecutif> etudiantsExecutifList = etudiantsExecutifRepository.findAll();
        assertThat(etudiantsExecutifList).hasSize(databaseSizeBeforeCreate + 1);
        EtudiantsExecutif testEtudiantsExecutif = etudiantsExecutifList.get(etudiantsExecutifList.size() - 1);
        assertThat(testEtudiantsExecutif.getSuffixe()).isEqualTo(DEFAULT_SUFFIXE);
        assertThat(testEtudiantsExecutif.getNom()).isEqualTo(DEFAULT_NOM);
        assertThat(testEtudiantsExecutif.getPrenom()).isEqualTo(DEFAULT_PRENOM);
        assertThat(testEtudiantsExecutif.getDateNaissance()).isEqualTo(DEFAULT_DATE_NAISSANCE);
        assertThat(testEtudiantsExecutif.getAdresseContact()).isEqualTo(DEFAULT_ADRESSE_CONTACT);
        assertThat(testEtudiantsExecutif.getVille()).isEqualTo(DEFAULT_VILLE);
        assertThat(testEtudiantsExecutif.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testEtudiantsExecutif.getPjBac()).isEqualTo(DEFAULT_PJ_BAC);
        assertThat(testEtudiantsExecutif.getMention()).isEqualTo(DEFAULT_MENTION);
        assertThat(testEtudiantsExecutif.getAnneeObtention()).isEqualTo(DEFAULT_ANNEE_OBTENTION);
        assertThat(testEtudiantsExecutif.getCinPass()).isEqualTo(DEFAULT_CIN_PASS);
        assertThat(testEtudiantsExecutif.getPaysNationalite()).isEqualTo(DEFAULT_PAYS_NATIONALITE);
        assertThat(testEtudiantsExecutif.getPaysResidence()).isEqualTo(DEFAULT_PAYS_RESIDENCE);
        assertThat(testEtudiantsExecutif.getCodepostal()).isEqualTo(DEFAULT_CODEPOSTAL);
        assertThat(testEtudiantsExecutif.getProvince()).isEqualTo(DEFAULT_PROVINCE);
        assertThat(testEtudiantsExecutif.getTel()).isEqualTo(DEFAULT_TEL);
        assertThat(testEtudiantsExecutif.getDeuxiemeTel()).isEqualTo(DEFAULT_DEUXIEME_TEL);
        assertThat(testEtudiantsExecutif.getPhoto()).isEqualTo(DEFAULT_PHOTO);
        assertThat(testEtudiantsExecutif.getPhotoContentType()).isEqualTo(DEFAULT_PHOTO_CONTENT_TYPE);
        assertThat(testEtudiantsExecutif.getCv()).isEqualTo(DEFAULT_CV);
        assertThat(testEtudiantsExecutif.getCvContentType()).isEqualTo(DEFAULT_CV_CONTENT_TYPE);
        assertThat(testEtudiantsExecutif.getAutreDocument()).isEqualTo(DEFAULT_AUTRE_DOCUMENT);
        assertThat(testEtudiantsExecutif.getAutreDocumentContentType()).isEqualTo(DEFAULT_AUTRE_DOCUMENT_CONTENT_TYPE);
        assertThat(testEtudiantsExecutif.getAttestationDeTravail()).isEqualTo(DEFAULT_ATTESTATION_DE_TRAVAIL);
        assertThat(testEtudiantsExecutif.getAttestationDeTravailContentType()).isEqualTo(DEFAULT_ATTESTATION_DE_TRAVAIL_CONTENT_TYPE);
        assertThat(testEtudiantsExecutif.getBacalaureat()).isEqualTo(DEFAULT_BACALAUREAT);
        assertThat(testEtudiantsExecutif.getBacalaureatContentType()).isEqualTo(DEFAULT_BACALAUREAT_CONTENT_TYPE);
        assertThat(testEtudiantsExecutif.getCinPassport()).isEqualTo(DEFAULT_CIN_PASSPORT);
        assertThat(testEtudiantsExecutif.getCinPassportContentType()).isEqualTo(DEFAULT_CIN_PASSPORT_CONTENT_TYPE);
        assertThat(testEtudiantsExecutif.getDiplome()).isEqualTo(DEFAULT_DIPLOME);
        assertThat(testEtudiantsExecutif.getDiplomeContentType()).isEqualTo(DEFAULT_DIPLOME_CONTENT_TYPE);
        assertThat(testEtudiantsExecutif.isInscriptionvalide()).isEqualTo(DEFAULT_INSCRIPTIONVALIDE);
        assertThat(testEtudiantsExecutif.isAbsent()).isEqualTo(DEFAULT_ABSENT);
    }

    @Test
    @Transactional
    public void createEtudiantsExecutifWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = etudiantsExecutifRepository.findAll().size();

        // Create the EtudiantsExecutif with an existing ID
        etudiantsExecutif.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEtudiantsExecutifMockMvc.perform(post("/api/etudiants-executifs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(etudiantsExecutif)))
            .andExpect(status().isBadRequest());

        // Validate the EtudiantsExecutif in the database
        List<EtudiantsExecutif> etudiantsExecutifList = etudiantsExecutifRepository.findAll();
        assertThat(etudiantsExecutifList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNomIsRequired() throws Exception {
        int databaseSizeBeforeTest = etudiantsExecutifRepository.findAll().size();
        // set the field null
        etudiantsExecutif.setNom(null);

        // Create the EtudiantsExecutif, which fails.

        restEtudiantsExecutifMockMvc.perform(post("/api/etudiants-executifs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(etudiantsExecutif)))
            .andExpect(status().isBadRequest());

        List<EtudiantsExecutif> etudiantsExecutifList = etudiantsExecutifRepository.findAll();
        assertThat(etudiantsExecutifList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPrenomIsRequired() throws Exception {
        int databaseSizeBeforeTest = etudiantsExecutifRepository.findAll().size();
        // set the field null
        etudiantsExecutif.setPrenom(null);

        // Create the EtudiantsExecutif, which fails.

        restEtudiantsExecutifMockMvc.perform(post("/api/etudiants-executifs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(etudiantsExecutif)))
            .andExpect(status().isBadRequest());

        List<EtudiantsExecutif> etudiantsExecutifList = etudiantsExecutifRepository.findAll();
        assertThat(etudiantsExecutifList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDateNaissanceIsRequired() throws Exception {
        int databaseSizeBeforeTest = etudiantsExecutifRepository.findAll().size();
        // set the field null
        etudiantsExecutif.setDateNaissance(null);

        // Create the EtudiantsExecutif, which fails.

        restEtudiantsExecutifMockMvc.perform(post("/api/etudiants-executifs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(etudiantsExecutif)))
            .andExpect(status().isBadRequest());

        List<EtudiantsExecutif> etudiantsExecutifList = etudiantsExecutifRepository.findAll();
        assertThat(etudiantsExecutifList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkAdresseContactIsRequired() throws Exception {
        int databaseSizeBeforeTest = etudiantsExecutifRepository.findAll().size();
        // set the field null
        etudiantsExecutif.setAdresseContact(null);

        // Create the EtudiantsExecutif, which fails.

        restEtudiantsExecutifMockMvc.perform(post("/api/etudiants-executifs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(etudiantsExecutif)))
            .andExpect(status().isBadRequest());

        List<EtudiantsExecutif> etudiantsExecutifList = etudiantsExecutifRepository.findAll();
        assertThat(etudiantsExecutifList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkEmailIsRequired() throws Exception {
        int databaseSizeBeforeTest = etudiantsExecutifRepository.findAll().size();
        // set the field null
        etudiantsExecutif.setEmail(null);

        // Create the EtudiantsExecutif, which fails.

        restEtudiantsExecutifMockMvc.perform(post("/api/etudiants-executifs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(etudiantsExecutif)))
            .andExpect(status().isBadRequest());

        List<EtudiantsExecutif> etudiantsExecutifList = etudiantsExecutifRepository.findAll();
        assertThat(etudiantsExecutifList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCinPassIsRequired() throws Exception {
        int databaseSizeBeforeTest = etudiantsExecutifRepository.findAll().size();
        // set the field null
        etudiantsExecutif.setCinPass(null);

        // Create the EtudiantsExecutif, which fails.

        restEtudiantsExecutifMockMvc.perform(post("/api/etudiants-executifs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(etudiantsExecutif)))
            .andExpect(status().isBadRequest());

        List<EtudiantsExecutif> etudiantsExecutifList = etudiantsExecutifRepository.findAll();
        assertThat(etudiantsExecutifList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllEtudiantsExecutifs() throws Exception {
        // Initialize the database
        etudiantsExecutifRepository.saveAndFlush(etudiantsExecutif);

        // Get all the etudiantsExecutifList
        restEtudiantsExecutifMockMvc.perform(get("/api/etudiants-executifs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(etudiantsExecutif.getId().intValue())))
            .andExpect(jsonPath("$.[*].suffixe").value(hasItem(DEFAULT_SUFFIXE.toString())))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM.toString())))
            .andExpect(jsonPath("$.[*].prenom").value(hasItem(DEFAULT_PRENOM.toString())))
            .andExpect(jsonPath("$.[*].dateNaissance").value(hasItem(DEFAULT_DATE_NAISSANCE.toString())))
            .andExpect(jsonPath("$.[*].adresseContact").value(hasItem(DEFAULT_ADRESSE_CONTACT.toString())))
            .andExpect(jsonPath("$.[*].ville").value(hasItem(DEFAULT_VILLE.toString())))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL.toString())))
            .andExpect(jsonPath("$.[*].pjBac").value(hasItem(DEFAULT_PJ_BAC.toString())))
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
            .andExpect(jsonPath("$.[*].cvContentType").value(hasItem(DEFAULT_CV_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].cv").value(hasItem(Base64Utils.encodeToString(DEFAULT_CV))))
            .andExpect(jsonPath("$.[*].autreDocumentContentType").value(hasItem(DEFAULT_AUTRE_DOCUMENT_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].autreDocument").value(hasItem(Base64Utils.encodeToString(DEFAULT_AUTRE_DOCUMENT))))
            .andExpect(jsonPath("$.[*].attestationDeTravailContentType").value(hasItem(DEFAULT_ATTESTATION_DE_TRAVAIL_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].attestationDeTravail").value(hasItem(Base64Utils.encodeToString(DEFAULT_ATTESTATION_DE_TRAVAIL))))
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
    public void getEtudiantsExecutif() throws Exception {
        // Initialize the database
        etudiantsExecutifRepository.saveAndFlush(etudiantsExecutif);

        // Get the etudiantsExecutif
        restEtudiantsExecutifMockMvc.perform(get("/api/etudiants-executifs/{id}", etudiantsExecutif.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(etudiantsExecutif.getId().intValue()))
            .andExpect(jsonPath("$.suffixe").value(DEFAULT_SUFFIXE.toString()))
            .andExpect(jsonPath("$.nom").value(DEFAULT_NOM.toString()))
            .andExpect(jsonPath("$.prenom").value(DEFAULT_PRENOM.toString()))
            .andExpect(jsonPath("$.dateNaissance").value(DEFAULT_DATE_NAISSANCE.toString()))
            .andExpect(jsonPath("$.adresseContact").value(DEFAULT_ADRESSE_CONTACT.toString()))
            .andExpect(jsonPath("$.ville").value(DEFAULT_VILLE.toString()))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL.toString()))
            .andExpect(jsonPath("$.pjBac").value(DEFAULT_PJ_BAC.toString()))
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
            .andExpect(jsonPath("$.cvContentType").value(DEFAULT_CV_CONTENT_TYPE))
            .andExpect(jsonPath("$.cv").value(Base64Utils.encodeToString(DEFAULT_CV)))
            .andExpect(jsonPath("$.autreDocumentContentType").value(DEFAULT_AUTRE_DOCUMENT_CONTENT_TYPE))
            .andExpect(jsonPath("$.autreDocument").value(Base64Utils.encodeToString(DEFAULT_AUTRE_DOCUMENT)))
            .andExpect(jsonPath("$.attestationDeTravailContentType").value(DEFAULT_ATTESTATION_DE_TRAVAIL_CONTENT_TYPE))
            .andExpect(jsonPath("$.attestationDeTravail").value(Base64Utils.encodeToString(DEFAULT_ATTESTATION_DE_TRAVAIL)))
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
    public void getNonExistingEtudiantsExecutif() throws Exception {
        // Get the etudiantsExecutif
        restEtudiantsExecutifMockMvc.perform(get("/api/etudiants-executifs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEtudiantsExecutif() throws Exception {
        // Initialize the database
        etudiantsExecutifRepository.saveAndFlush(etudiantsExecutif);

        int databaseSizeBeforeUpdate = etudiantsExecutifRepository.findAll().size();

        // Update the etudiantsExecutif
        EtudiantsExecutif updatedEtudiantsExecutif = etudiantsExecutifRepository.findById(etudiantsExecutif.getId()).get();
        // Disconnect from session so that the updates on updatedEtudiantsExecutif are not directly saved in db
        em.detach(updatedEtudiantsExecutif);
        updatedEtudiantsExecutif
            .suffixe(UPDATED_SUFFIXE)
            .nom(UPDATED_NOM)
            .prenom(UPDATED_PRENOM)
            .dateNaissance(UPDATED_DATE_NAISSANCE)
            .adresseContact(UPDATED_ADRESSE_CONTACT)
            .ville(UPDATED_VILLE)
            .email(UPDATED_EMAIL)
            .pjBac(UPDATED_PJ_BAC)
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
            .cv(UPDATED_CV)
            .cvContentType(UPDATED_CV_CONTENT_TYPE)
            .autreDocument(UPDATED_AUTRE_DOCUMENT)
            .autreDocumentContentType(UPDATED_AUTRE_DOCUMENT_CONTENT_TYPE)
            .attestationDeTravail(UPDATED_ATTESTATION_DE_TRAVAIL)
            .attestationDeTravailContentType(UPDATED_ATTESTATION_DE_TRAVAIL_CONTENT_TYPE)
            .bacalaureat(UPDATED_BACALAUREAT)
            .bacalaureatContentType(UPDATED_BACALAUREAT_CONTENT_TYPE)
            .cinPassport(UPDATED_CIN_PASSPORT)
            .cinPassportContentType(UPDATED_CIN_PASSPORT_CONTENT_TYPE)
            .diplome(UPDATED_DIPLOME)
            .diplomeContentType(UPDATED_DIPLOME_CONTENT_TYPE)
            .inscriptionvalide(UPDATED_INSCRIPTIONVALIDE)
            .absent(UPDATED_ABSENT);

        restEtudiantsExecutifMockMvc.perform(put("/api/etudiants-executifs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEtudiantsExecutif)))
            .andExpect(status().isOk());

        // Validate the EtudiantsExecutif in the database
        List<EtudiantsExecutif> etudiantsExecutifList = etudiantsExecutifRepository.findAll();
        assertThat(etudiantsExecutifList).hasSize(databaseSizeBeforeUpdate);
        EtudiantsExecutif testEtudiantsExecutif = etudiantsExecutifList.get(etudiantsExecutifList.size() - 1);
        assertThat(testEtudiantsExecutif.getSuffixe()).isEqualTo(UPDATED_SUFFIXE);
        assertThat(testEtudiantsExecutif.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testEtudiantsExecutif.getPrenom()).isEqualTo(UPDATED_PRENOM);
        assertThat(testEtudiantsExecutif.getDateNaissance()).isEqualTo(UPDATED_DATE_NAISSANCE);
        assertThat(testEtudiantsExecutif.getAdresseContact()).isEqualTo(UPDATED_ADRESSE_CONTACT);
        assertThat(testEtudiantsExecutif.getVille()).isEqualTo(UPDATED_VILLE);
        assertThat(testEtudiantsExecutif.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testEtudiantsExecutif.getPjBac()).isEqualTo(UPDATED_PJ_BAC);
        assertThat(testEtudiantsExecutif.getMention()).isEqualTo(UPDATED_MENTION);
        assertThat(testEtudiantsExecutif.getAnneeObtention()).isEqualTo(UPDATED_ANNEE_OBTENTION);
        assertThat(testEtudiantsExecutif.getCinPass()).isEqualTo(UPDATED_CIN_PASS);
        assertThat(testEtudiantsExecutif.getPaysNationalite()).isEqualTo(UPDATED_PAYS_NATIONALITE);
        assertThat(testEtudiantsExecutif.getPaysResidence()).isEqualTo(UPDATED_PAYS_RESIDENCE);
        assertThat(testEtudiantsExecutif.getCodepostal()).isEqualTo(UPDATED_CODEPOSTAL);
        assertThat(testEtudiantsExecutif.getProvince()).isEqualTo(UPDATED_PROVINCE);
        assertThat(testEtudiantsExecutif.getTel()).isEqualTo(UPDATED_TEL);
        assertThat(testEtudiantsExecutif.getDeuxiemeTel()).isEqualTo(UPDATED_DEUXIEME_TEL);
        assertThat(testEtudiantsExecutif.getPhoto()).isEqualTo(UPDATED_PHOTO);
        assertThat(testEtudiantsExecutif.getPhotoContentType()).isEqualTo(UPDATED_PHOTO_CONTENT_TYPE);
        assertThat(testEtudiantsExecutif.getCv()).isEqualTo(UPDATED_CV);
        assertThat(testEtudiantsExecutif.getCvContentType()).isEqualTo(UPDATED_CV_CONTENT_TYPE);
        assertThat(testEtudiantsExecutif.getAutreDocument()).isEqualTo(UPDATED_AUTRE_DOCUMENT);
        assertThat(testEtudiantsExecutif.getAutreDocumentContentType()).isEqualTo(UPDATED_AUTRE_DOCUMENT_CONTENT_TYPE);
        assertThat(testEtudiantsExecutif.getAttestationDeTravail()).isEqualTo(UPDATED_ATTESTATION_DE_TRAVAIL);
        assertThat(testEtudiantsExecutif.getAttestationDeTravailContentType()).isEqualTo(UPDATED_ATTESTATION_DE_TRAVAIL_CONTENT_TYPE);
        assertThat(testEtudiantsExecutif.getBacalaureat()).isEqualTo(UPDATED_BACALAUREAT);
        assertThat(testEtudiantsExecutif.getBacalaureatContentType()).isEqualTo(UPDATED_BACALAUREAT_CONTENT_TYPE);
        assertThat(testEtudiantsExecutif.getCinPassport()).isEqualTo(UPDATED_CIN_PASSPORT);
        assertThat(testEtudiantsExecutif.getCinPassportContentType()).isEqualTo(UPDATED_CIN_PASSPORT_CONTENT_TYPE);
        assertThat(testEtudiantsExecutif.getDiplome()).isEqualTo(UPDATED_DIPLOME);
        assertThat(testEtudiantsExecutif.getDiplomeContentType()).isEqualTo(UPDATED_DIPLOME_CONTENT_TYPE);
        assertThat(testEtudiantsExecutif.isInscriptionvalide()).isEqualTo(UPDATED_INSCRIPTIONVALIDE);
        assertThat(testEtudiantsExecutif.isAbsent()).isEqualTo(UPDATED_ABSENT);
    }

    @Test
    @Transactional
    public void updateNonExistingEtudiantsExecutif() throws Exception {
        int databaseSizeBeforeUpdate = etudiantsExecutifRepository.findAll().size();

        // Create the EtudiantsExecutif

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEtudiantsExecutifMockMvc.perform(put("/api/etudiants-executifs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(etudiantsExecutif)))
            .andExpect(status().isBadRequest());

        // Validate the EtudiantsExecutif in the database
        List<EtudiantsExecutif> etudiantsExecutifList = etudiantsExecutifRepository.findAll();
        assertThat(etudiantsExecutifList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteEtudiantsExecutif() throws Exception {
        // Initialize the database
        etudiantsExecutifRepository.saveAndFlush(etudiantsExecutif);

        int databaseSizeBeforeDelete = etudiantsExecutifRepository.findAll().size();

        // Delete the etudiantsExecutif
        restEtudiantsExecutifMockMvc.perform(delete("/api/etudiants-executifs/{id}", etudiantsExecutif.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<EtudiantsExecutif> etudiantsExecutifList = etudiantsExecutifRepository.findAll();
        assertThat(etudiantsExecutifList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EtudiantsExecutif.class);
        EtudiantsExecutif etudiantsExecutif1 = new EtudiantsExecutif();
        etudiantsExecutif1.setId(1L);
        EtudiantsExecutif etudiantsExecutif2 = new EtudiantsExecutif();
        etudiantsExecutif2.setId(etudiantsExecutif1.getId());
        assertThat(etudiantsExecutif1).isEqualTo(etudiantsExecutif2);
        etudiantsExecutif2.setId(2L);
        assertThat(etudiantsExecutif1).isNotEqualTo(etudiantsExecutif2);
        etudiantsExecutif1.setId(null);
        assertThat(etudiantsExecutif1).isNotEqualTo(etudiantsExecutif2);
    }
}
