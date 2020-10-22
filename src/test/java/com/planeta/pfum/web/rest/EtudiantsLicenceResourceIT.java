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
import com.planeta.pfum.domain.EtudiantsLicence;
import com.planeta.pfum.domain.Filiere;
import com.planeta.pfum.domain.ModalitePaiement;
import com.planeta.pfum.domain.User;
import com.planeta.pfum.domain.enumeration.DiplomeBac;
import com.planeta.pfum.domain.enumeration.Mention;
import com.planeta.pfum.repository.EtudiantsLicenceRepository;
import com.planeta.pfum.web.rest.errors.ExceptionTranslator;

/**
 * Integration tests for the {@Link EtudiantsLicenceResource} REST controller.
 */
@SpringBootTest(classes = PfumApp.class)
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

	private static final Boolean DEFAULT_INSCRIPTIONVALIDE = false;
	private static final Boolean UPDATED_INSCRIPTIONVALIDE = true;

	private static final Boolean DEFAULT_ABSENT = false;
	private static final Boolean UPDATED_ABSENT = true;

	@Autowired
	private EtudiantsLicenceRepository etudiantsLicenceRepository;


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
		final EtudiantsLicenceResource etudiantsLicenceResource = new EtudiantsLicenceResource(
				etudiantsLicenceRepository);
		this.restEtudiantsLicenceMockMvc = MockMvcBuilders.standaloneSetup(etudiantsLicenceResource)
				.setCustomArgumentResolvers(pageableArgumentResolver).setControllerAdvice(exceptionTranslator)
				.setConversionService(createFormattingConversionService()).setMessageConverters(jacksonMessageConverter)
				.setValidator(validator).build();
	}

	/**
	 * Create an entity for this test.
	 *
	 * This is a static method, as tests for other entities might also need it, if
	 * they test an entity which requires the current entity.
	 */
	public static EtudiantsLicence createEntity(EntityManager em) {
		EtudiantsLicence etudiantsLicence = new EtudiantsLicence().suffixe(DEFAULT_SUFFIXE).nom(DEFAULT_NOM)
				.prenom(DEFAULT_PRENOM).dateNaissance(DEFAULT_DATE_NAISSANCE).adresseContact(DEFAULT_ADRESSE_CONTACT)
				.ville(DEFAULT_VILLE).email(DEFAULT_EMAIL).pjBac(DEFAULT_PJ_BAC).mention(DEFAULT_MENTION)
				.anneeObtention(DEFAULT_ANNEE_OBTENTION).cinPass(DEFAULT_CIN_PASS)
				.paysNationalite(DEFAULT_PAYS_NATIONALITE).paysResidence(DEFAULT_PAYS_RESIDENCE)
				.codepostal(DEFAULT_CODEPOSTAL).province(DEFAULT_PROVINCE).tel(DEFAULT_TEL)
				.deuxiemeTel(DEFAULT_DEUXIEME_TEL).photo(DEFAULT_PHOTO).photoContentType(DEFAULT_PHOTO_CONTENT_TYPE)
				.testAdmission(DEFAULT_TEST_ADMISSION).testAdmissionContentType(DEFAULT_TEST_ADMISSION_CONTENT_TYPE)
				.relevesNotes(DEFAULT_RELEVES_NOTES).relevesNotesContentType(DEFAULT_RELEVES_NOTES_CONTENT_TYPE)
				.bacalaureat(DEFAULT_BACALAUREAT).bacalaureatContentType(DEFAULT_BACALAUREAT_CONTENT_TYPE)
				.cinPassport(DEFAULT_CIN_PASSPORT).cinPassportContentType(DEFAULT_CIN_PASSPORT_CONTENT_TYPE)
				.inscriptionvalide(DEFAULT_INSCRIPTIONVALIDE).absent(DEFAULT_ABSENT);
		return etudiantsLicence;
	}

	/**
	 * Create an updated entity for this test.
	 *
	 * This is a static method, as tests for other entities might also need it, if
	 * they test an entity which requires the current entity.
	 */
	public static EtudiantsLicence createUpdatedEntity(EntityManager em) {
		EtudiantsLicence etudiantsLicence = new EtudiantsLicence().suffixe(UPDATED_SUFFIXE).nom(UPDATED_NOM)
				.prenom(UPDATED_PRENOM).dateNaissance(UPDATED_DATE_NAISSANCE).adresseContact(UPDATED_ADRESSE_CONTACT)
				.ville(UPDATED_VILLE).email(UPDATED_EMAIL).pjBac(UPDATED_PJ_BAC).mention(UPDATED_MENTION)
				.anneeObtention(UPDATED_ANNEE_OBTENTION).cinPass(UPDATED_CIN_PASS)
				.paysNationalite(UPDATED_PAYS_NATIONALITE).paysResidence(UPDATED_PAYS_RESIDENCE)
				.codepostal(UPDATED_CODEPOSTAL).province(UPDATED_PROVINCE).tel(UPDATED_TEL)
				.deuxiemeTel(UPDATED_DEUXIEME_TEL).photo(UPDATED_PHOTO).photoContentType(UPDATED_PHOTO_CONTENT_TYPE)
				.testAdmission(UPDATED_TEST_ADMISSION).testAdmissionContentType(UPDATED_TEST_ADMISSION_CONTENT_TYPE)
				.relevesNotes(UPDATED_RELEVES_NOTES).relevesNotesContentType(UPDATED_RELEVES_NOTES_CONTENT_TYPE)
				.bacalaureat(UPDATED_BACALAUREAT).bacalaureatContentType(UPDATED_BACALAUREAT_CONTENT_TYPE)
				.cinPassport(UPDATED_CIN_PASSPORT).cinPassportContentType(UPDATED_CIN_PASSPORT_CONTENT_TYPE)
				.inscriptionvalide(UPDATED_INSCRIPTIONVALIDE).absent(UPDATED_ABSENT);
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
		restEtudiantsLicenceMockMvc.perform(post("/api/etudiants-licences").contentType(TestUtil.APPLICATION_JSON_UTF8)
				.content(TestUtil.convertObjectToJsonBytes(etudiantsLicence))).andExpect(status().isCreated());

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
		assertThat(testEtudiantsLicence.getAnneeObtention()).isEqualTo(DEFAULT_ANNEE_OBTENTION);
		assertThat(testEtudiantsLicence.getCinPass()).isEqualTo(DEFAULT_CIN_PASS);
		assertThat(testEtudiantsLicence.getPaysNationalite()).isEqualTo(DEFAULT_PAYS_NATIONALITE);
		assertThat(testEtudiantsLicence.getPaysResidence()).isEqualTo(DEFAULT_PAYS_RESIDENCE);
		assertThat(testEtudiantsLicence.getCodepostal()).isEqualTo(DEFAULT_CODEPOSTAL);
		assertThat(testEtudiantsLicence.getProvince()).isEqualTo(DEFAULT_PROVINCE);
		assertThat(testEtudiantsLicence.getTel()).isEqualTo(DEFAULT_TEL);
		assertThat(testEtudiantsLicence.getDeuxiemeTel()).isEqualTo(DEFAULT_DEUXIEME_TEL);
		assertThat(testEtudiantsLicence.getPhoto()).isEqualTo(DEFAULT_PHOTO);
		assertThat(testEtudiantsLicence.getPhotoContentType()).isEqualTo(DEFAULT_PHOTO_CONTENT_TYPE);
		assertThat(testEtudiantsLicence.getTestAdmission()).isEqualTo(DEFAULT_TEST_ADMISSION);
		assertThat(testEtudiantsLicence.getTestAdmissionContentType()).isEqualTo(DEFAULT_TEST_ADMISSION_CONTENT_TYPE);
		assertThat(testEtudiantsLicence.getRelevesNotes()).isEqualTo(DEFAULT_RELEVES_NOTES);
		assertThat(testEtudiantsLicence.getRelevesNotesContentType()).isEqualTo(DEFAULT_RELEVES_NOTES_CONTENT_TYPE);
		assertThat(testEtudiantsLicence.getBacalaureat()).isEqualTo(DEFAULT_BACALAUREAT);
		assertThat(testEtudiantsLicence.getBacalaureatContentType()).isEqualTo(DEFAULT_BACALAUREAT_CONTENT_TYPE);
		assertThat(testEtudiantsLicence.getCinPassport()).isEqualTo(DEFAULT_CIN_PASSPORT);
		assertThat(testEtudiantsLicence.getCinPassportContentType()).isEqualTo(DEFAULT_CIN_PASSPORT_CONTENT_TYPE);
		assertThat(testEtudiantsLicence.isInscriptionvalide()).isEqualTo(DEFAULT_INSCRIPTIONVALIDE);
		assertThat(testEtudiantsLicence.isAbsent()).isEqualTo(DEFAULT_ABSENT);
	}

	@Test
	@Transactional
	public void createEtudiantsLicenceWithExistingId() throws Exception {
		int databaseSizeBeforeCreate = etudiantsLicenceRepository.findAll().size();

		// Create the EtudiantsLicence with an existing ID
		etudiantsLicence.setId(1L);

		// An entity with an existing ID cannot be created, so this API call must fail
		restEtudiantsLicenceMockMvc
				.perform(post("/api/etudiants-licences").contentType(TestUtil.APPLICATION_JSON_UTF8)
						.content(TestUtil.convertObjectToJsonBytes(etudiantsLicence)))
				.andExpect(status().isBadRequest());

		// Validate the EtudiantsLicence in the database
		List<EtudiantsLicence> etudiantsLicenceList = etudiantsLicenceRepository.findAll();
		assertThat(etudiantsLicenceList).hasSize(databaseSizeBeforeCreate);
	}

	@Test
	@Transactional
	public void checkNomIsRequired() throws Exception {
		int databaseSizeBeforeTest = etudiantsLicenceRepository.findAll().size();
		// set the field null
		etudiantsLicence.setNom(null);

		// Create the EtudiantsLicence, which fails.

		restEtudiantsLicenceMockMvc
				.perform(post("/api/etudiants-licences").contentType(TestUtil.APPLICATION_JSON_UTF8)
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

		restEtudiantsLicenceMockMvc
				.perform(post("/api/etudiants-licences").contentType(TestUtil.APPLICATION_JSON_UTF8)
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

		restEtudiantsLicenceMockMvc
				.perform(post("/api/etudiants-licences").contentType(TestUtil.APPLICATION_JSON_UTF8)
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

		restEtudiantsLicenceMockMvc
				.perform(post("/api/etudiants-licences").contentType(TestUtil.APPLICATION_JSON_UTF8)
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

		restEtudiantsLicenceMockMvc
				.perform(post("/api/etudiants-licences").contentType(TestUtil.APPLICATION_JSON_UTF8)
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

		restEtudiantsLicenceMockMvc
				.perform(post("/api/etudiants-licences").contentType(TestUtil.APPLICATION_JSON_UTF8)
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
		restEtudiantsLicenceMockMvc.perform(get("/api/etudiants-licences?sort=id,desc")).andExpect(status().isOk())
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
				.andExpect(
						jsonPath("$.[*].testAdmissionContentType").value(hasItem(DEFAULT_TEST_ADMISSION_CONTENT_TYPE)))
				.andExpect(jsonPath("$.[*].testAdmission")
						.value(hasItem(Base64Utils.encodeToString(DEFAULT_TEST_ADMISSION))))
				.andExpect(jsonPath("$.[*].relevesNotesContentType").value(hasItem(DEFAULT_RELEVES_NOTES_CONTENT_TYPE)))
				.andExpect(jsonPath("$.[*].relevesNotes")
						.value(hasItem(Base64Utils.encodeToString(DEFAULT_RELEVES_NOTES))))
				.andExpect(jsonPath("$.[*].bacalaureatContentType").value(hasItem(DEFAULT_BACALAUREAT_CONTENT_TYPE)))
				.andExpect(
						jsonPath("$.[*].bacalaureat").value(hasItem(Base64Utils.encodeToString(DEFAULT_BACALAUREAT))))
				.andExpect(jsonPath("$.[*].cinPassportContentType").value(hasItem(DEFAULT_CIN_PASSPORT_CONTENT_TYPE)))
				.andExpect(
						jsonPath("$.[*].cinPassport").value(hasItem(Base64Utils.encodeToString(DEFAULT_CIN_PASSPORT))))
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
				.andExpect(status().isOk()).andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
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
				.andExpect(jsonPath("$.inscriptionvalide").value(DEFAULT_INSCRIPTIONVALIDE.booleanValue()))
				.andExpect(jsonPath("$.absent").value(DEFAULT_ABSENT.booleanValue()));
	}

	@Test
	@Transactional
	public void getAllEtudiantsLicencesBySuffixeIsEqualToSomething() throws Exception {
		// Initialize the database
		etudiantsLicenceRepository.saveAndFlush(etudiantsLicence);

		// Get all the etudiantsLicenceList where suffixe equals to DEFAULT_SUFFIXE
		defaultEtudiantsLicenceShouldBeFound("suffixe.equals=" + DEFAULT_SUFFIXE);

		// Get all the etudiantsLicenceList where suffixe equals to UPDATED_SUFFIXE
		defaultEtudiantsLicenceShouldNotBeFound("suffixe.equals=" + UPDATED_SUFFIXE);
	}

	@Test
	@Transactional
	public void getAllEtudiantsLicencesBySuffixeIsInShouldWork() throws Exception {
		// Initialize the database
		etudiantsLicenceRepository.saveAndFlush(etudiantsLicence);

		// Get all the etudiantsLicenceList where suffixe in DEFAULT_SUFFIXE or
		// UPDATED_SUFFIXE
		defaultEtudiantsLicenceShouldBeFound("suffixe.in=" + DEFAULT_SUFFIXE + "," + UPDATED_SUFFIXE);

		// Get all the etudiantsLicenceList where suffixe equals to UPDATED_SUFFIXE
		defaultEtudiantsLicenceShouldNotBeFound("suffixe.in=" + UPDATED_SUFFIXE);
	}

	@Test
	@Transactional
	public void getAllEtudiantsLicencesBySuffixeIsNullOrNotNull() throws Exception {
		// Initialize the database
		etudiantsLicenceRepository.saveAndFlush(etudiantsLicence);

		// Get all the etudiantsLicenceList where suffixe is not null
		defaultEtudiantsLicenceShouldBeFound("suffixe.specified=true");

		// Get all the etudiantsLicenceList where suffixe is null
		defaultEtudiantsLicenceShouldNotBeFound("suffixe.specified=false");
	}

	@Test
	@Transactional
	public void getAllEtudiantsLicencesByNomIsEqualToSomething() throws Exception {
		// Initialize the database
		etudiantsLicenceRepository.saveAndFlush(etudiantsLicence);

		// Get all the etudiantsLicenceList where nom equals to DEFAULT_NOM
		defaultEtudiantsLicenceShouldBeFound("nom.equals=" + DEFAULT_NOM);

		// Get all the etudiantsLicenceList where nom equals to UPDATED_NOM
		defaultEtudiantsLicenceShouldNotBeFound("nom.equals=" + UPDATED_NOM);
	}

	@Test
	@Transactional
	public void getAllEtudiantsLicencesByNomIsInShouldWork() throws Exception {
		// Initialize the database
		etudiantsLicenceRepository.saveAndFlush(etudiantsLicence);

		// Get all the etudiantsLicenceList where nom in DEFAULT_NOM or UPDATED_NOM
		defaultEtudiantsLicenceShouldBeFound("nom.in=" + DEFAULT_NOM + "," + UPDATED_NOM);

		// Get all the etudiantsLicenceList where nom equals to UPDATED_NOM
		defaultEtudiantsLicenceShouldNotBeFound("nom.in=" + UPDATED_NOM);
	}

	@Test
	@Transactional
	public void getAllEtudiantsLicencesByNomIsNullOrNotNull() throws Exception {
		// Initialize the database
		etudiantsLicenceRepository.saveAndFlush(etudiantsLicence);

		// Get all the etudiantsLicenceList where nom is not null
		defaultEtudiantsLicenceShouldBeFound("nom.specified=true");

		// Get all the etudiantsLicenceList where nom is null
		defaultEtudiantsLicenceShouldNotBeFound("nom.specified=false");
	}

	@Test
	@Transactional
	public void getAllEtudiantsLicencesByPrenomIsEqualToSomething() throws Exception {
		// Initialize the database
		etudiantsLicenceRepository.saveAndFlush(etudiantsLicence);

		// Get all the etudiantsLicenceList where prenom equals to DEFAULT_PRENOM
		defaultEtudiantsLicenceShouldBeFound("prenom.equals=" + DEFAULT_PRENOM);

		// Get all the etudiantsLicenceList where prenom equals to UPDATED_PRENOM
		defaultEtudiantsLicenceShouldNotBeFound("prenom.equals=" + UPDATED_PRENOM);
	}

	@Test
	@Transactional
	public void getAllEtudiantsLicencesByPrenomIsInShouldWork() throws Exception {
		// Initialize the database
		etudiantsLicenceRepository.saveAndFlush(etudiantsLicence);

		// Get all the etudiantsLicenceList where prenom in DEFAULT_PRENOM or
		// UPDATED_PRENOM
		defaultEtudiantsLicenceShouldBeFound("prenom.in=" + DEFAULT_PRENOM + "," + UPDATED_PRENOM);

		// Get all the etudiantsLicenceList where prenom equals to UPDATED_PRENOM
		defaultEtudiantsLicenceShouldNotBeFound("prenom.in=" + UPDATED_PRENOM);
	}

	@Test
	@Transactional
	public void getAllEtudiantsLicencesByPrenomIsNullOrNotNull() throws Exception {
		// Initialize the database
		etudiantsLicenceRepository.saveAndFlush(etudiantsLicence);

		// Get all the etudiantsLicenceList where prenom is not null
		defaultEtudiantsLicenceShouldBeFound("prenom.specified=true");

		// Get all the etudiantsLicenceList where prenom is null
		defaultEtudiantsLicenceShouldNotBeFound("prenom.specified=false");
	}

	@Test
	@Transactional
	public void getAllEtudiantsLicencesByDateNaissanceIsEqualToSomething() throws Exception {
		// Initialize the database
		etudiantsLicenceRepository.saveAndFlush(etudiantsLicence);

		// Get all the etudiantsLicenceList where dateNaissance equals to
		// DEFAULT_DATE_NAISSANCE
		defaultEtudiantsLicenceShouldBeFound("dateNaissance.equals=" + DEFAULT_DATE_NAISSANCE);

		// Get all the etudiantsLicenceList where dateNaissance equals to
		// UPDATED_DATE_NAISSANCE
		defaultEtudiantsLicenceShouldNotBeFound("dateNaissance.equals=" + UPDATED_DATE_NAISSANCE);
	}

	@Test
	@Transactional
	public void getAllEtudiantsLicencesByDateNaissanceIsInShouldWork() throws Exception {
		// Initialize the database
		etudiantsLicenceRepository.saveAndFlush(etudiantsLicence);

		// Get all the etudiantsLicenceList where dateNaissance in
		// DEFAULT_DATE_NAISSANCE or UPDATED_DATE_NAISSANCE
		defaultEtudiantsLicenceShouldBeFound(
				"dateNaissance.in=" + DEFAULT_DATE_NAISSANCE + "," + UPDATED_DATE_NAISSANCE);

		// Get all the etudiantsLicenceList where dateNaissance equals to
		// UPDATED_DATE_NAISSANCE
		defaultEtudiantsLicenceShouldNotBeFound("dateNaissance.in=" + UPDATED_DATE_NAISSANCE);
	}

	@Test
	@Transactional
	public void getAllEtudiantsLicencesByDateNaissanceIsNullOrNotNull() throws Exception {
		// Initialize the database
		etudiantsLicenceRepository.saveAndFlush(etudiantsLicence);

		// Get all the etudiantsLicenceList where dateNaissance is not null
		defaultEtudiantsLicenceShouldBeFound("dateNaissance.specified=true");

		// Get all the etudiantsLicenceList where dateNaissance is null
		defaultEtudiantsLicenceShouldNotBeFound("dateNaissance.specified=false");
	}

	@Test
	@Transactional
	public void getAllEtudiantsLicencesByAdresseContactIsEqualToSomething() throws Exception {
		// Initialize the database
		etudiantsLicenceRepository.saveAndFlush(etudiantsLicence);

		// Get all the etudiantsLicenceList where adresseContact equals to
		// DEFAULT_ADRESSE_CONTACT
		defaultEtudiantsLicenceShouldBeFound("adresseContact.equals=" + DEFAULT_ADRESSE_CONTACT);

		// Get all the etudiantsLicenceList where adresseContact equals to
		// UPDATED_ADRESSE_CONTACT
		defaultEtudiantsLicenceShouldNotBeFound("adresseContact.equals=" + UPDATED_ADRESSE_CONTACT);
	}

	@Test
	@Transactional
	public void getAllEtudiantsLicencesByAdresseContactIsInShouldWork() throws Exception {
		// Initialize the database
		etudiantsLicenceRepository.saveAndFlush(etudiantsLicence);

		// Get all the etudiantsLicenceList where adresseContact in
		// DEFAULT_ADRESSE_CONTACT or UPDATED_ADRESSE_CONTACT
		defaultEtudiantsLicenceShouldBeFound(
				"adresseContact.in=" + DEFAULT_ADRESSE_CONTACT + "," + UPDATED_ADRESSE_CONTACT);

		// Get all the etudiantsLicenceList where adresseContact equals to
		// UPDATED_ADRESSE_CONTACT
		defaultEtudiantsLicenceShouldNotBeFound("adresseContact.in=" + UPDATED_ADRESSE_CONTACT);
	}

	@Test
	@Transactional
	public void getAllEtudiantsLicencesByAdresseContactIsNullOrNotNull() throws Exception {
		// Initialize the database
		etudiantsLicenceRepository.saveAndFlush(etudiantsLicence);

		// Get all the etudiantsLicenceList where adresseContact is not null
		defaultEtudiantsLicenceShouldBeFound("adresseContact.specified=true");

		// Get all the etudiantsLicenceList where adresseContact is null
		defaultEtudiantsLicenceShouldNotBeFound("adresseContact.specified=false");
	}

	@Test
	@Transactional
	public void getAllEtudiantsLicencesByVilleIsEqualToSomething() throws Exception {
		// Initialize the database
		etudiantsLicenceRepository.saveAndFlush(etudiantsLicence);

		// Get all the etudiantsLicenceList where ville equals to DEFAULT_VILLE
		defaultEtudiantsLicenceShouldBeFound("ville.equals=" + DEFAULT_VILLE);

		// Get all the etudiantsLicenceList where ville equals to UPDATED_VILLE
		defaultEtudiantsLicenceShouldNotBeFound("ville.equals=" + UPDATED_VILLE);
	}

	@Test
	@Transactional
	public void getAllEtudiantsLicencesByVilleIsInShouldWork() throws Exception {
		// Initialize the database
		etudiantsLicenceRepository.saveAndFlush(etudiantsLicence);

		// Get all the etudiantsLicenceList where ville in DEFAULT_VILLE or
		// UPDATED_VILLE
		defaultEtudiantsLicenceShouldBeFound("ville.in=" + DEFAULT_VILLE + "," + UPDATED_VILLE);

		// Get all the etudiantsLicenceList where ville equals to UPDATED_VILLE
		defaultEtudiantsLicenceShouldNotBeFound("ville.in=" + UPDATED_VILLE);
	}

	@Test
	@Transactional
	public void getAllEtudiantsLicencesByVilleIsNullOrNotNull() throws Exception {
		// Initialize the database
		etudiantsLicenceRepository.saveAndFlush(etudiantsLicence);

		// Get all the etudiantsLicenceList where ville is not null
		defaultEtudiantsLicenceShouldBeFound("ville.specified=true");

		// Get all the etudiantsLicenceList where ville is null
		defaultEtudiantsLicenceShouldNotBeFound("ville.specified=false");
	}

	@Test
	@Transactional
	public void getAllEtudiantsLicencesByEmailIsEqualToSomething() throws Exception {
		// Initialize the database
		etudiantsLicenceRepository.saveAndFlush(etudiantsLicence);

		// Get all the etudiantsLicenceList where email equals to DEFAULT_EMAIL
		defaultEtudiantsLicenceShouldBeFound("email.equals=" + DEFAULT_EMAIL);

		// Get all the etudiantsLicenceList where email equals to UPDATED_EMAIL
		defaultEtudiantsLicenceShouldNotBeFound("email.equals=" + UPDATED_EMAIL);
	}

	@Test
	@Transactional
	public void getAllEtudiantsLicencesByEmailIsInShouldWork() throws Exception {
		// Initialize the database
		etudiantsLicenceRepository.saveAndFlush(etudiantsLicence);

		// Get all the etudiantsLicenceList where email in DEFAULT_EMAIL or
		// UPDATED_EMAIL
		defaultEtudiantsLicenceShouldBeFound("email.in=" + DEFAULT_EMAIL + "," + UPDATED_EMAIL);

		// Get all the etudiantsLicenceList where email equals to UPDATED_EMAIL
		defaultEtudiantsLicenceShouldNotBeFound("email.in=" + UPDATED_EMAIL);
	}

	@Test
	@Transactional
	public void getAllEtudiantsLicencesByEmailIsNullOrNotNull() throws Exception {
		// Initialize the database
		etudiantsLicenceRepository.saveAndFlush(etudiantsLicence);

		// Get all the etudiantsLicenceList where email is not null
		defaultEtudiantsLicenceShouldBeFound("email.specified=true");

		// Get all the etudiantsLicenceList where email is null
		defaultEtudiantsLicenceShouldNotBeFound("email.specified=false");
	}

	@Test
	@Transactional
	public void getAllEtudiantsLicencesByPjBacIsEqualToSomething() throws Exception {
		// Initialize the database
		etudiantsLicenceRepository.saveAndFlush(etudiantsLicence);

		// Get all the etudiantsLicenceList where pjBac equals to DEFAULT_PJ_BAC
		defaultEtudiantsLicenceShouldBeFound("pjBac.equals=" + DEFAULT_PJ_BAC);

		// Get all the etudiantsLicenceList where pjBac equals to UPDATED_PJ_BAC
		defaultEtudiantsLicenceShouldNotBeFound("pjBac.equals=" + UPDATED_PJ_BAC);
	}

	@Test
	@Transactional
	public void getAllEtudiantsLicencesByPjBacIsInShouldWork() throws Exception {
		// Initialize the database
		etudiantsLicenceRepository.saveAndFlush(etudiantsLicence);

		// Get all the etudiantsLicenceList where pjBac in DEFAULT_PJ_BAC or
		// UPDATED_PJ_BAC
		defaultEtudiantsLicenceShouldBeFound("pjBac.in=" + DEFAULT_PJ_BAC + "," + UPDATED_PJ_BAC);

		// Get all the etudiantsLicenceList where pjBac equals to UPDATED_PJ_BAC
		defaultEtudiantsLicenceShouldNotBeFound("pjBac.in=" + UPDATED_PJ_BAC);
	}

	@Test
	@Transactional
	public void getAllEtudiantsLicencesByPjBacIsNullOrNotNull() throws Exception {
		// Initialize the database
		etudiantsLicenceRepository.saveAndFlush(etudiantsLicence);

		// Get all the etudiantsLicenceList where pjBac is not null
		defaultEtudiantsLicenceShouldBeFound("pjBac.specified=true");

		// Get all the etudiantsLicenceList where pjBac is null
		defaultEtudiantsLicenceShouldNotBeFound("pjBac.specified=false");
	}

	@Test
	@Transactional
	public void getAllEtudiantsLicencesByMentionIsEqualToSomething() throws Exception {
		// Initialize the database
		etudiantsLicenceRepository.saveAndFlush(etudiantsLicence);

		// Get all the etudiantsLicenceList where mention equals to DEFAULT_MENTION
		defaultEtudiantsLicenceShouldBeFound("mention.equals=" + DEFAULT_MENTION);

		// Get all the etudiantsLicenceList where mention equals to UPDATED_MENTION
		defaultEtudiantsLicenceShouldNotBeFound("mention.equals=" + UPDATED_MENTION);
	}

	@Test
	@Transactional
	public void getAllEtudiantsLicencesByMentionIsInShouldWork() throws Exception {
		// Initialize the database
		etudiantsLicenceRepository.saveAndFlush(etudiantsLicence);

		// Get all the etudiantsLicenceList where mention in DEFAULT_MENTION or
		// UPDATED_MENTION
		defaultEtudiantsLicenceShouldBeFound("mention.in=" + DEFAULT_MENTION + "," + UPDATED_MENTION);

		// Get all the etudiantsLicenceList where mention equals to UPDATED_MENTION
		defaultEtudiantsLicenceShouldNotBeFound("mention.in=" + UPDATED_MENTION);
	}

	@Test
	@Transactional
	public void getAllEtudiantsLicencesByMentionIsNullOrNotNull() throws Exception {
		// Initialize the database
		etudiantsLicenceRepository.saveAndFlush(etudiantsLicence);

		// Get all the etudiantsLicenceList where mention is not null
		defaultEtudiantsLicenceShouldBeFound("mention.specified=true");

		// Get all the etudiantsLicenceList where mention is null
		defaultEtudiantsLicenceShouldNotBeFound("mention.specified=false");
	}

	@Test
	@Transactional
	public void getAllEtudiantsLicencesByAnneeObtentionIsEqualToSomething() throws Exception {
		// Initialize the database
		etudiantsLicenceRepository.saveAndFlush(etudiantsLicence);

		// Get all the etudiantsLicenceList where anneeObtention equals to
		// DEFAULT_ANNEE_OBTENTION
		defaultEtudiantsLicenceShouldBeFound("anneeObtention.equals=" + DEFAULT_ANNEE_OBTENTION);

		// Get all the etudiantsLicenceList where anneeObtention equals to
		// UPDATED_ANNEE_OBTENTION
		defaultEtudiantsLicenceShouldNotBeFound("anneeObtention.equals=" + UPDATED_ANNEE_OBTENTION);
	}

	@Test
	@Transactional
	public void getAllEtudiantsLicencesByAnneeObtentionIsInShouldWork() throws Exception {
		// Initialize the database
		etudiantsLicenceRepository.saveAndFlush(etudiantsLicence);

		// Get all the etudiantsLicenceList where anneeObtention in
		// DEFAULT_ANNEE_OBTENTION or UPDATED_ANNEE_OBTENTION
		defaultEtudiantsLicenceShouldBeFound(
				"anneeObtention.in=" + DEFAULT_ANNEE_OBTENTION + "," + UPDATED_ANNEE_OBTENTION);

		// Get all the etudiantsLicenceList where anneeObtention equals to
		// UPDATED_ANNEE_OBTENTION
		defaultEtudiantsLicenceShouldNotBeFound("anneeObtention.in=" + UPDATED_ANNEE_OBTENTION);
	}

	@Test
	@Transactional
	public void getAllEtudiantsLicencesByAnneeObtentionIsNullOrNotNull() throws Exception {
		// Initialize the database
		etudiantsLicenceRepository.saveAndFlush(etudiantsLicence);

		// Get all the etudiantsLicenceList where anneeObtention is not null
		defaultEtudiantsLicenceShouldBeFound("anneeObtention.specified=true");

		// Get all the etudiantsLicenceList where anneeObtention is null
		defaultEtudiantsLicenceShouldNotBeFound("anneeObtention.specified=false");
	}

	@Test
	@Transactional
	public void getAllEtudiantsLicencesByCinPassIsEqualToSomething() throws Exception {
		// Initialize the database
		etudiantsLicenceRepository.saveAndFlush(etudiantsLicence);

		// Get all the etudiantsLicenceList where cinPass equals to DEFAULT_CIN_PASS
		defaultEtudiantsLicenceShouldBeFound("cinPass.equals=" + DEFAULT_CIN_PASS);

		// Get all the etudiantsLicenceList where cinPass equals to UPDATED_CIN_PASS
		defaultEtudiantsLicenceShouldNotBeFound("cinPass.equals=" + UPDATED_CIN_PASS);
	}

	@Test
	@Transactional
	public void getAllEtudiantsLicencesByCinPassIsInShouldWork() throws Exception {
		// Initialize the database
		etudiantsLicenceRepository.saveAndFlush(etudiantsLicence);

		// Get all the etudiantsLicenceList where cinPass in DEFAULT_CIN_PASS or
		// UPDATED_CIN_PASS
		defaultEtudiantsLicenceShouldBeFound("cinPass.in=" + DEFAULT_CIN_PASS + "," + UPDATED_CIN_PASS);

		// Get all the etudiantsLicenceList where cinPass equals to UPDATED_CIN_PASS
		defaultEtudiantsLicenceShouldNotBeFound("cinPass.in=" + UPDATED_CIN_PASS);
	}

	@Test
	@Transactional
	public void getAllEtudiantsLicencesByCinPassIsNullOrNotNull() throws Exception {
		// Initialize the database
		etudiantsLicenceRepository.saveAndFlush(etudiantsLicence);

		// Get all the etudiantsLicenceList where cinPass is not null
		defaultEtudiantsLicenceShouldBeFound("cinPass.specified=true");

		// Get all the etudiantsLicenceList where cinPass is null
		defaultEtudiantsLicenceShouldNotBeFound("cinPass.specified=false");
	}

	@Test
	@Transactional
	public void getAllEtudiantsLicencesByPaysNationaliteIsEqualToSomething() throws Exception {
		// Initialize the database
		etudiantsLicenceRepository.saveAndFlush(etudiantsLicence);

		// Get all the etudiantsLicenceList where paysNationalite equals to
		// DEFAULT_PAYS_NATIONALITE
		defaultEtudiantsLicenceShouldBeFound("paysNationalite.equals=" + DEFAULT_PAYS_NATIONALITE);

		// Get all the etudiantsLicenceList where paysNationalite equals to
		// UPDATED_PAYS_NATIONALITE
		defaultEtudiantsLicenceShouldNotBeFound("paysNationalite.equals=" + UPDATED_PAYS_NATIONALITE);
	}

	@Test
	@Transactional
	public void getAllEtudiantsLicencesByPaysNationaliteIsInShouldWork() throws Exception {
		// Initialize the database
		etudiantsLicenceRepository.saveAndFlush(etudiantsLicence);

		// Get all the etudiantsLicenceList where paysNationalite in
		// DEFAULT_PAYS_NATIONALITE or UPDATED_PAYS_NATIONALITE
		defaultEtudiantsLicenceShouldBeFound(
				"paysNationalite.in=" + DEFAULT_PAYS_NATIONALITE + "," + UPDATED_PAYS_NATIONALITE);

		// Get all the etudiantsLicenceList where paysNationalite equals to
		// UPDATED_PAYS_NATIONALITE
		defaultEtudiantsLicenceShouldNotBeFound("paysNationalite.in=" + UPDATED_PAYS_NATIONALITE);
	}

	@Test
	@Transactional
	public void getAllEtudiantsLicencesByPaysNationaliteIsNullOrNotNull() throws Exception {
		// Initialize the database
		etudiantsLicenceRepository.saveAndFlush(etudiantsLicence);

		// Get all the etudiantsLicenceList where paysNationalite is not null
		defaultEtudiantsLicenceShouldBeFound("paysNationalite.specified=true");

		// Get all the etudiantsLicenceList where paysNationalite is null
		defaultEtudiantsLicenceShouldNotBeFound("paysNationalite.specified=false");
	}

	@Test
	@Transactional
	public void getAllEtudiantsLicencesByPaysResidenceIsEqualToSomething() throws Exception {
		// Initialize the database
		etudiantsLicenceRepository.saveAndFlush(etudiantsLicence);

		// Get all the etudiantsLicenceList where paysResidence equals to
		// DEFAULT_PAYS_RESIDENCE
		defaultEtudiantsLicenceShouldBeFound("paysResidence.equals=" + DEFAULT_PAYS_RESIDENCE);

		// Get all the etudiantsLicenceList where paysResidence equals to
		// UPDATED_PAYS_RESIDENCE
		defaultEtudiantsLicenceShouldNotBeFound("paysResidence.equals=" + UPDATED_PAYS_RESIDENCE);
	}

	@Test
	@Transactional
	public void getAllEtudiantsLicencesByPaysResidenceIsInShouldWork() throws Exception {
		// Initialize the database
		etudiantsLicenceRepository.saveAndFlush(etudiantsLicence);

		// Get all the etudiantsLicenceList where paysResidence in
		// DEFAULT_PAYS_RESIDENCE or UPDATED_PAYS_RESIDENCE
		defaultEtudiantsLicenceShouldBeFound(
				"paysResidence.in=" + DEFAULT_PAYS_RESIDENCE + "," + UPDATED_PAYS_RESIDENCE);

		// Get all the etudiantsLicenceList where paysResidence equals to
		// UPDATED_PAYS_RESIDENCE
		defaultEtudiantsLicenceShouldNotBeFound("paysResidence.in=" + UPDATED_PAYS_RESIDENCE);
	}

	@Test
	@Transactional
	public void getAllEtudiantsLicencesByPaysResidenceIsNullOrNotNull() throws Exception {
		// Initialize the database
		etudiantsLicenceRepository.saveAndFlush(etudiantsLicence);

		// Get all the etudiantsLicenceList where paysResidence is not null
		defaultEtudiantsLicenceShouldBeFound("paysResidence.specified=true");

		// Get all the etudiantsLicenceList where paysResidence is null
		defaultEtudiantsLicenceShouldNotBeFound("paysResidence.specified=false");
	}

	@Test
	@Transactional
	public void getAllEtudiantsLicencesByCodepostalIsEqualToSomething() throws Exception {
		// Initialize the database
		etudiantsLicenceRepository.saveAndFlush(etudiantsLicence);

		// Get all the etudiantsLicenceList where codepostal equals to
		// DEFAULT_CODEPOSTAL
		defaultEtudiantsLicenceShouldBeFound("codepostal.equals=" + DEFAULT_CODEPOSTAL);

		// Get all the etudiantsLicenceList where codepostal equals to
		// UPDATED_CODEPOSTAL
		defaultEtudiantsLicenceShouldNotBeFound("codepostal.equals=" + UPDATED_CODEPOSTAL);
	}

	@Test
	@Transactional
	public void getAllEtudiantsLicencesByCodepostalIsInShouldWork() throws Exception {
		// Initialize the database
		etudiantsLicenceRepository.saveAndFlush(etudiantsLicence);

		// Get all the etudiantsLicenceList where codepostal in DEFAULT_CODEPOSTAL or
		// UPDATED_CODEPOSTAL
		defaultEtudiantsLicenceShouldBeFound("codepostal.in=" + DEFAULT_CODEPOSTAL + "," + UPDATED_CODEPOSTAL);

		// Get all the etudiantsLicenceList where codepostal equals to
		// UPDATED_CODEPOSTAL
		defaultEtudiantsLicenceShouldNotBeFound("codepostal.in=" + UPDATED_CODEPOSTAL);
	}

	@Test
	@Transactional
	public void getAllEtudiantsLicencesByCodepostalIsNullOrNotNull() throws Exception {
		// Initialize the database
		etudiantsLicenceRepository.saveAndFlush(etudiantsLicence);

		// Get all the etudiantsLicenceList where codepostal is not null
		defaultEtudiantsLicenceShouldBeFound("codepostal.specified=true");

		// Get all the etudiantsLicenceList where codepostal is null
		defaultEtudiantsLicenceShouldNotBeFound("codepostal.specified=false");
	}

	@Test
	@Transactional
	public void getAllEtudiantsLicencesByProvinceIsEqualToSomething() throws Exception {
		// Initialize the database
		etudiantsLicenceRepository.saveAndFlush(etudiantsLicence);

		// Get all the etudiantsLicenceList where province equals to DEFAULT_PROVINCE
		defaultEtudiantsLicenceShouldBeFound("province.equals=" + DEFAULT_PROVINCE);

		// Get all the etudiantsLicenceList where province equals to UPDATED_PROVINCE
		defaultEtudiantsLicenceShouldNotBeFound("province.equals=" + UPDATED_PROVINCE);
	}

	@Test
	@Transactional
	public void getAllEtudiantsLicencesByProvinceIsInShouldWork() throws Exception {
		// Initialize the database
		etudiantsLicenceRepository.saveAndFlush(etudiantsLicence);

		// Get all the etudiantsLicenceList where province in DEFAULT_PROVINCE or
		// UPDATED_PROVINCE
		defaultEtudiantsLicenceShouldBeFound("province.in=" + DEFAULT_PROVINCE + "," + UPDATED_PROVINCE);

		// Get all the etudiantsLicenceList where province equals to UPDATED_PROVINCE
		defaultEtudiantsLicenceShouldNotBeFound("province.in=" + UPDATED_PROVINCE);
	}

	@Test
	@Transactional
	public void getAllEtudiantsLicencesByProvinceIsNullOrNotNull() throws Exception {
		// Initialize the database
		etudiantsLicenceRepository.saveAndFlush(etudiantsLicence);

		// Get all the etudiantsLicenceList where province is not null
		defaultEtudiantsLicenceShouldBeFound("province.specified=true");

		// Get all the etudiantsLicenceList where province is null
		defaultEtudiantsLicenceShouldNotBeFound("province.specified=false");
	}

	@Test
	@Transactional
	public void getAllEtudiantsLicencesByTelIsEqualToSomething() throws Exception {
		// Initialize the database
		etudiantsLicenceRepository.saveAndFlush(etudiantsLicence);

		// Get all the etudiantsLicenceList where tel equals to DEFAULT_TEL
		defaultEtudiantsLicenceShouldBeFound("tel.equals=" + DEFAULT_TEL);

		// Get all the etudiantsLicenceList where tel equals to UPDATED_TEL
		defaultEtudiantsLicenceShouldNotBeFound("tel.equals=" + UPDATED_TEL);
	}

	@Test
	@Transactional
	public void getAllEtudiantsLicencesByTelIsInShouldWork() throws Exception {
		// Initialize the database
		etudiantsLicenceRepository.saveAndFlush(etudiantsLicence);

		// Get all the etudiantsLicenceList where tel in DEFAULT_TEL or UPDATED_TEL
		defaultEtudiantsLicenceShouldBeFound("tel.in=" + DEFAULT_TEL + "," + UPDATED_TEL);

		// Get all the etudiantsLicenceList where tel equals to UPDATED_TEL
		defaultEtudiantsLicenceShouldNotBeFound("tel.in=" + UPDATED_TEL);
	}

	@Test
	@Transactional
	public void getAllEtudiantsLicencesByTelIsNullOrNotNull() throws Exception {
		// Initialize the database
		etudiantsLicenceRepository.saveAndFlush(etudiantsLicence);

		// Get all the etudiantsLicenceList where tel is not null
		defaultEtudiantsLicenceShouldBeFound("tel.specified=true");

		// Get all the etudiantsLicenceList where tel is null
		defaultEtudiantsLicenceShouldNotBeFound("tel.specified=false");
	}

	@Test
	@Transactional
	public void getAllEtudiantsLicencesByTelIsGreaterThanOrEqualToSomething() throws Exception {
		// Initialize the database
		etudiantsLicenceRepository.saveAndFlush(etudiantsLicence);

		// Get all the etudiantsLicenceList where tel greater than or equals to
		// DEFAULT_TEL
		defaultEtudiantsLicenceShouldBeFound("tel.greaterOrEqualThan=" + DEFAULT_TEL);

		// Get all the etudiantsLicenceList where tel greater than or equals to
		// UPDATED_TEL
		defaultEtudiantsLicenceShouldNotBeFound("tel.greaterOrEqualThan=" + UPDATED_TEL);
	}

	@Test
	@Transactional
	public void getAllEtudiantsLicencesByTelIsLessThanSomething() throws Exception {
		// Initialize the database
		etudiantsLicenceRepository.saveAndFlush(etudiantsLicence);

		// Get all the etudiantsLicenceList where tel less than or equals to DEFAULT_TEL
		defaultEtudiantsLicenceShouldNotBeFound("tel.lessThan=" + DEFAULT_TEL);

		// Get all the etudiantsLicenceList where tel less than or equals to UPDATED_TEL
		defaultEtudiantsLicenceShouldBeFound("tel.lessThan=" + UPDATED_TEL);
	}

	@Test
	@Transactional
	public void getAllEtudiantsLicencesByDeuxiemeTelIsEqualToSomething() throws Exception {
		// Initialize the database
		etudiantsLicenceRepository.saveAndFlush(etudiantsLicence);

		// Get all the etudiantsLicenceList where deuxiemeTel equals to
		// DEFAULT_DEUXIEME_TEL
		defaultEtudiantsLicenceShouldBeFound("deuxiemeTel.equals=" + DEFAULT_DEUXIEME_TEL);

		// Get all the etudiantsLicenceList where deuxiemeTel equals to
		// UPDATED_DEUXIEME_TEL
		defaultEtudiantsLicenceShouldNotBeFound("deuxiemeTel.equals=" + UPDATED_DEUXIEME_TEL);
	}

	@Test
	@Transactional
	public void getAllEtudiantsLicencesByDeuxiemeTelIsInShouldWork() throws Exception {
		// Initialize the database
		etudiantsLicenceRepository.saveAndFlush(etudiantsLicence);

		// Get all the etudiantsLicenceList where deuxiemeTel in DEFAULT_DEUXIEME_TEL or
		// UPDATED_DEUXIEME_TEL
		defaultEtudiantsLicenceShouldBeFound("deuxiemeTel.in=" + DEFAULT_DEUXIEME_TEL + "," + UPDATED_DEUXIEME_TEL);

		// Get all the etudiantsLicenceList where deuxiemeTel equals to
		// UPDATED_DEUXIEME_TEL
		defaultEtudiantsLicenceShouldNotBeFound("deuxiemeTel.in=" + UPDATED_DEUXIEME_TEL);
	}

	@Test
	@Transactional
	public void getAllEtudiantsLicencesByDeuxiemeTelIsNullOrNotNull() throws Exception {
		// Initialize the database
		etudiantsLicenceRepository.saveAndFlush(etudiantsLicence);

		// Get all the etudiantsLicenceList where deuxiemeTel is not null
		defaultEtudiantsLicenceShouldBeFound("deuxiemeTel.specified=true");

		// Get all the etudiantsLicenceList where deuxiemeTel is null
		defaultEtudiantsLicenceShouldNotBeFound("deuxiemeTel.specified=false");
	}

	@Test
	@Transactional
	public void getAllEtudiantsLicencesByDeuxiemeTelIsGreaterThanOrEqualToSomething() throws Exception {
		// Initialize the database
		etudiantsLicenceRepository.saveAndFlush(etudiantsLicence);

		// Get all the etudiantsLicenceList where deuxiemeTel greater than or equals to
		// DEFAULT_DEUXIEME_TEL
		defaultEtudiantsLicenceShouldBeFound("deuxiemeTel.greaterOrEqualThan=" + DEFAULT_DEUXIEME_TEL);

		// Get all the etudiantsLicenceList where deuxiemeTel greater than or equals to
		// UPDATED_DEUXIEME_TEL
		defaultEtudiantsLicenceShouldNotBeFound("deuxiemeTel.greaterOrEqualThan=" + UPDATED_DEUXIEME_TEL);
	}

	@Test
	@Transactional
	public void getAllEtudiantsLicencesByDeuxiemeTelIsLessThanSomething() throws Exception {
		// Initialize the database
		etudiantsLicenceRepository.saveAndFlush(etudiantsLicence);

		// Get all the etudiantsLicenceList where deuxiemeTel less than or equals to
		// DEFAULT_DEUXIEME_TEL
		defaultEtudiantsLicenceShouldNotBeFound("deuxiemeTel.lessThan=" + DEFAULT_DEUXIEME_TEL);

		// Get all the etudiantsLicenceList where deuxiemeTel less than or equals to
		// UPDATED_DEUXIEME_TEL
		defaultEtudiantsLicenceShouldBeFound("deuxiemeTel.lessThan=" + UPDATED_DEUXIEME_TEL);
	}

	@Test
	@Transactional
	public void getAllEtudiantsLicencesByInscriptionvalideIsEqualToSomething() throws Exception {
		// Initialize the database
		etudiantsLicenceRepository.saveAndFlush(etudiantsLicence);

		// Get all the etudiantsLicenceList where inscriptionvalide equals to
		// DEFAULT_INSCRIPTIONVALIDE
		defaultEtudiantsLicenceShouldBeFound("inscriptionvalide.equals=" + DEFAULT_INSCRIPTIONVALIDE);

		// Get all the etudiantsLicenceList where inscriptionvalide equals to
		// UPDATED_INSCRIPTIONVALIDE
		defaultEtudiantsLicenceShouldNotBeFound("inscriptionvalide.equals=" + UPDATED_INSCRIPTIONVALIDE);
	}

	@Test
	@Transactional
	public void getAllEtudiantsLicencesByInscriptionvalideIsInShouldWork() throws Exception {
		// Initialize the database
		etudiantsLicenceRepository.saveAndFlush(etudiantsLicence);

		// Get all the etudiantsLicenceList where inscriptionvalide in
		// DEFAULT_INSCRIPTIONVALIDE or UPDATED_INSCRIPTIONVALIDE
		defaultEtudiantsLicenceShouldBeFound(
				"inscriptionvalide.in=" + DEFAULT_INSCRIPTIONVALIDE + "," + UPDATED_INSCRIPTIONVALIDE);

		// Get all the etudiantsLicenceList where inscriptionvalide equals to
		// UPDATED_INSCRIPTIONVALIDE
		defaultEtudiantsLicenceShouldNotBeFound("inscriptionvalide.in=" + UPDATED_INSCRIPTIONVALIDE);
	}

	@Test
	@Transactional
	public void getAllEtudiantsLicencesByInscriptionvalideIsNullOrNotNull() throws Exception {
		// Initialize the database
		etudiantsLicenceRepository.saveAndFlush(etudiantsLicence);

		// Get all the etudiantsLicenceList where inscriptionvalide is not null
		defaultEtudiantsLicenceShouldBeFound("inscriptionvalide.specified=true");

		// Get all the etudiantsLicenceList where inscriptionvalide is null
		defaultEtudiantsLicenceShouldNotBeFound("inscriptionvalide.specified=false");
	}

	@Test
	@Transactional
	public void getAllEtudiantsLicencesByAbsentIsEqualToSomething() throws Exception {
		// Initialize the database
		etudiantsLicenceRepository.saveAndFlush(etudiantsLicence);

		// Get all the etudiantsLicenceList where absent equals to DEFAULT_ABSENT
		defaultEtudiantsLicenceShouldBeFound("absent.equals=" + DEFAULT_ABSENT);

		// Get all the etudiantsLicenceList where absent equals to UPDATED_ABSENT
		defaultEtudiantsLicenceShouldNotBeFound("absent.equals=" + UPDATED_ABSENT);
	}

	@Test
	@Transactional
	public void getAllEtudiantsLicencesByAbsentIsInShouldWork() throws Exception {
		// Initialize the database
		etudiantsLicenceRepository.saveAndFlush(etudiantsLicence);

		// Get all the etudiantsLicenceList where absent in DEFAULT_ABSENT or
		// UPDATED_ABSENT
		defaultEtudiantsLicenceShouldBeFound("absent.in=" + DEFAULT_ABSENT + "," + UPDATED_ABSENT);

		// Get all the etudiantsLicenceList where absent equals to UPDATED_ABSENT
		defaultEtudiantsLicenceShouldNotBeFound("absent.in=" + UPDATED_ABSENT);
	}

	@Test
	@Transactional
	public void getAllEtudiantsLicencesByAbsentIsNullOrNotNull() throws Exception {
		// Initialize the database
		etudiantsLicenceRepository.saveAndFlush(etudiantsLicence);

		// Get all the etudiantsLicenceList where absent is not null
		defaultEtudiantsLicenceShouldBeFound("absent.specified=true");

		// Get all the etudiantsLicenceList where absent is null
		defaultEtudiantsLicenceShouldNotBeFound("absent.specified=false");
	}

	@Test
	@Transactional
	public void getAllEtudiantsLicencesByUserIsEqualToSomething() throws Exception {
		// Initialize the database
		User user = UserResourceIT.createEntity(em);
		em.persist(user);
		em.flush();
		etudiantsLicence.setUser(user);
		etudiantsLicenceRepository.saveAndFlush(etudiantsLicence);
		Long userId = user.getId();

		// Get all the etudiantsLicenceList where user equals to userId
		defaultEtudiantsLicenceShouldBeFound("userId.equals=" + userId);

		// Get all the etudiantsLicenceList where user equals to userId + 1
		defaultEtudiantsLicenceShouldNotBeFound("userId.equals=" + (userId + 1));
	}

	@Test
	@Transactional
	public void getAllEtudiantsLicencesByAbsenceIsEqualToSomething() throws Exception {
		// Initialize the database
		Absence absence = AbsenceResourceIT.createEntity(em);
		em.persist(absence);
		em.flush();
		etudiantsLicence.addAbsence(absence);
		etudiantsLicenceRepository.saveAndFlush(etudiantsLicence);
		Long absenceId = absence.getId();

		// Get all the etudiantsLicenceList where absence equals to absenceId
		defaultEtudiantsLicenceShouldBeFound("absenceId.equals=" + absenceId);

		// Get all the etudiantsLicenceList where absence equals to absenceId + 1
		defaultEtudiantsLicenceShouldNotBeFound("absenceId.equals=" + (absenceId + 1));
	}

	@Test
	@Transactional
	public void getAllEtudiantsLicencesByEspaceEtudiantIsEqualToSomething() throws Exception {
		// Initialize the database
		EspaceEtudiant espaceEtudiant = EspaceEtudiantResourceIT.createEntity(em);
		em.persist(espaceEtudiant);
		em.flush();
		etudiantsLicence.addEspaceEtudiant(espaceEtudiant);
		etudiantsLicenceRepository.saveAndFlush(etudiantsLicence);
		Long espaceEtudiantId = espaceEtudiant.getId();

		// Get all the etudiantsLicenceList where espaceEtudiant equals to
		// espaceEtudiantId
		defaultEtudiantsLicenceShouldBeFound("espaceEtudiantId.equals=" + espaceEtudiantId);

		// Get all the etudiantsLicenceList where espaceEtudiant equals to
		// espaceEtudiantId + 1
		defaultEtudiantsLicenceShouldNotBeFound("espaceEtudiantId.equals=" + (espaceEtudiantId + 1));
	}

	@Test
	@Transactional
	public void getAllEtudiantsLicencesByFiliereIsEqualToSomething() throws Exception {
		// Initialize the database
		Filiere filiere = FiliereResourceIT.createEntity(em);
		em.persist(filiere);
		em.flush();
		etudiantsLicence.setFiliere(filiere);
		etudiantsLicenceRepository.saveAndFlush(etudiantsLicence);
		Long filiereId = filiere.getId();

		// Get all the etudiantsLicenceList where filiere equals to filiereId
		defaultEtudiantsLicenceShouldBeFound("filiereId.equals=" + filiereId);

		// Get all the etudiantsLicenceList where filiere equals to filiereId + 1
		defaultEtudiantsLicenceShouldNotBeFound("filiereId.equals=" + (filiereId + 1));
	}

	@Test
	@Transactional
	public void getAllEtudiantsLicencesByAnneeInscriptionIsEqualToSomething() throws Exception {
		// Initialize the database
		AnneeInscription anneeInscription = AnneeInscriptionResourceIT.createEntity(em);
		em.persist(anneeInscription);
		em.flush();
		etudiantsLicence.setAnneeInscription(anneeInscription);
		etudiantsLicenceRepository.saveAndFlush(etudiantsLicence);
		Long anneeInscriptionId = anneeInscription.getId();

		// Get all the etudiantsLicenceList where anneeInscription equals to
		// anneeInscriptionId
		defaultEtudiantsLicenceShouldBeFound("anneeInscriptionId.equals=" + anneeInscriptionId);

		// Get all the etudiantsLicenceList where anneeInscription equals to
		// anneeInscriptionId + 1
		defaultEtudiantsLicenceShouldNotBeFound("anneeInscriptionId.equals=" + (anneeInscriptionId + 1));
	}

	@Test
	@Transactional
	public void getAllEtudiantsLicencesByModaliteIsEqualToSomething() throws Exception {
		// Initialize the database
		ModalitePaiement modalite = ModalitePaiementResourceIT.createEntity(em);
		em.persist(modalite);
		em.flush();
		etudiantsLicence.setModalite(modalite);
		etudiantsLicenceRepository.saveAndFlush(etudiantsLicence);
		Long modaliteId = modalite.getId();

		// Get all the etudiantsLicenceList where modalite equals to modaliteId
		defaultEtudiantsLicenceShouldBeFound("modaliteId.equals=" + modaliteId);

		// Get all the etudiantsLicenceList where modalite equals to modaliteId + 1
		defaultEtudiantsLicenceShouldNotBeFound("modaliteId.equals=" + (modaliteId + 1));
	}

	/**
	 * Executes the search, and checks that the default entity is returned.
	 */
	private void defaultEtudiantsLicenceShouldBeFound(String filter) throws Exception {
		restEtudiantsLicenceMockMvc.perform(get("/api/etudiants-licences?sort=id,desc&" + filter))
				.andExpect(status().isOk()).andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
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
				.andExpect(
						jsonPath("$.[*].testAdmissionContentType").value(hasItem(DEFAULT_TEST_ADMISSION_CONTENT_TYPE)))
				.andExpect(jsonPath("$.[*].testAdmission")
						.value(hasItem(Base64Utils.encodeToString(DEFAULT_TEST_ADMISSION))))
				.andExpect(jsonPath("$.[*].relevesNotesContentType").value(hasItem(DEFAULT_RELEVES_NOTES_CONTENT_TYPE)))
				.andExpect(jsonPath("$.[*].relevesNotes")
						.value(hasItem(Base64Utils.encodeToString(DEFAULT_RELEVES_NOTES))))
				.andExpect(jsonPath("$.[*].bacalaureatContentType").value(hasItem(DEFAULT_BACALAUREAT_CONTENT_TYPE)))
				.andExpect(
						jsonPath("$.[*].bacalaureat").value(hasItem(Base64Utils.encodeToString(DEFAULT_BACALAUREAT))))
				.andExpect(jsonPath("$.[*].cinPassportContentType").value(hasItem(DEFAULT_CIN_PASSPORT_CONTENT_TYPE)))
				.andExpect(
						jsonPath("$.[*].cinPassport").value(hasItem(Base64Utils.encodeToString(DEFAULT_CIN_PASSPORT))))
				.andExpect(jsonPath("$.[*].inscriptionvalide").value(hasItem(DEFAULT_INSCRIPTIONVALIDE.booleanValue())))
				.andExpect(jsonPath("$.[*].absent").value(hasItem(DEFAULT_ABSENT.booleanValue())));

		// Check, that the count call also returns 1
		restEtudiantsLicenceMockMvc.perform(get("/api/etudiants-licences/count?sort=id,desc&" + filter))
				.andExpect(status().isOk()).andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
				.andExpect(content().string("1"));
	}

	/**
	 * Executes the search, and checks that the default entity is not returned.
	 */
	private void defaultEtudiantsLicenceShouldNotBeFound(String filter) throws Exception {
		restEtudiantsLicenceMockMvc.perform(get("/api/etudiants-licences?sort=id,desc&" + filter))
				.andExpect(status().isOk()).andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
				.andExpect(jsonPath("$").isArray()).andExpect(jsonPath("$").isEmpty());

		// Check, that the count call also returns 0
		restEtudiantsLicenceMockMvc.perform(get("/api/etudiants-licences/count?sort=id,desc&" + filter))
				.andExpect(status().isOk()).andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
				.andExpect(content().string("0"));
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
		etudiantsLicenceRepository.save(etudiantsLicence);

		int databaseSizeBeforeUpdate = etudiantsLicenceRepository.findAll().size();

		// Update the etudiantsLicence
		EtudiantsLicence updatedEtudiantsLicence = etudiantsLicenceRepository.findById(etudiantsLicence.getId()).get();
		// Disconnect from session so that the updates on updatedEtudiantsLicence are
		// not directly saved in db
		em.detach(updatedEtudiantsLicence);
		updatedEtudiantsLicence.suffixe(UPDATED_SUFFIXE).nom(UPDATED_NOM).prenom(UPDATED_PRENOM)
				.dateNaissance(UPDATED_DATE_NAISSANCE).adresseContact(UPDATED_ADRESSE_CONTACT).ville(UPDATED_VILLE)
				.email(UPDATED_EMAIL).pjBac(UPDATED_PJ_BAC).mention(UPDATED_MENTION)
				.anneeObtention(UPDATED_ANNEE_OBTENTION).cinPass(UPDATED_CIN_PASS)
				.paysNationalite(UPDATED_PAYS_NATIONALITE).paysResidence(UPDATED_PAYS_RESIDENCE)
				.codepostal(UPDATED_CODEPOSTAL).province(UPDATED_PROVINCE).tel(UPDATED_TEL)
				.deuxiemeTel(UPDATED_DEUXIEME_TEL).photo(UPDATED_PHOTO).photoContentType(UPDATED_PHOTO_CONTENT_TYPE)
				.testAdmission(UPDATED_TEST_ADMISSION).testAdmissionContentType(UPDATED_TEST_ADMISSION_CONTENT_TYPE)
				.relevesNotes(UPDATED_RELEVES_NOTES).relevesNotesContentType(UPDATED_RELEVES_NOTES_CONTENT_TYPE)
				.bacalaureat(UPDATED_BACALAUREAT).bacalaureatContentType(UPDATED_BACALAUREAT_CONTENT_TYPE)
				.cinPassport(UPDATED_CIN_PASSPORT).cinPassportContentType(UPDATED_CIN_PASSPORT_CONTENT_TYPE)
				.inscriptionvalide(UPDATED_INSCRIPTIONVALIDE).absent(UPDATED_ABSENT);

		restEtudiantsLicenceMockMvc
				.perform(put("/api/etudiants-licences").contentType(TestUtil.APPLICATION_JSON_UTF8)
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
		assertThat(testEtudiantsLicence.getAnneeObtention()).isEqualTo(UPDATED_ANNEE_OBTENTION);
		assertThat(testEtudiantsLicence.getCinPass()).isEqualTo(UPDATED_CIN_PASS);
		assertThat(testEtudiantsLicence.getPaysNationalite()).isEqualTo(UPDATED_PAYS_NATIONALITE);
		assertThat(testEtudiantsLicence.getPaysResidence()).isEqualTo(UPDATED_PAYS_RESIDENCE);
		assertThat(testEtudiantsLicence.getCodepostal()).isEqualTo(UPDATED_CODEPOSTAL);
		assertThat(testEtudiantsLicence.getProvince()).isEqualTo(UPDATED_PROVINCE);
		assertThat(testEtudiantsLicence.getTel()).isEqualTo(UPDATED_TEL);
		assertThat(testEtudiantsLicence.getDeuxiemeTel()).isEqualTo(UPDATED_DEUXIEME_TEL);
		assertThat(testEtudiantsLicence.getPhoto()).isEqualTo(UPDATED_PHOTO);
		assertThat(testEtudiantsLicence.getPhotoContentType()).isEqualTo(UPDATED_PHOTO_CONTENT_TYPE);
		assertThat(testEtudiantsLicence.getTestAdmission()).isEqualTo(UPDATED_TEST_ADMISSION);
		assertThat(testEtudiantsLicence.getTestAdmissionContentType()).isEqualTo(UPDATED_TEST_ADMISSION_CONTENT_TYPE);
		assertThat(testEtudiantsLicence.getRelevesNotes()).isEqualTo(UPDATED_RELEVES_NOTES);
		assertThat(testEtudiantsLicence.getRelevesNotesContentType()).isEqualTo(UPDATED_RELEVES_NOTES_CONTENT_TYPE);
		assertThat(testEtudiantsLicence.getBacalaureat()).isEqualTo(UPDATED_BACALAUREAT);
		assertThat(testEtudiantsLicence.getBacalaureatContentType()).isEqualTo(UPDATED_BACALAUREAT_CONTENT_TYPE);
		assertThat(testEtudiantsLicence.getCinPassport()).isEqualTo(UPDATED_CIN_PASSPORT);
		assertThat(testEtudiantsLicence.getCinPassportContentType()).isEqualTo(UPDATED_CIN_PASSPORT_CONTENT_TYPE);
		assertThat(testEtudiantsLicence.isInscriptionvalide()).isEqualTo(UPDATED_INSCRIPTIONVALIDE);
		assertThat(testEtudiantsLicence.isAbsent()).isEqualTo(UPDATED_ABSENT);
	}

	@Test
	@Transactional
	public void updateNonExistingEtudiantsLicence() throws Exception {
		int databaseSizeBeforeUpdate = etudiantsLicenceRepository.findAll().size();

		// Create the EtudiantsLicence

		// If the entity doesn't have an ID, it will throw BadRequestAlertException
		restEtudiantsLicenceMockMvc
				.perform(put("/api/etudiants-licences").contentType(TestUtil.APPLICATION_JSON_UTF8)
						.content(TestUtil.convertObjectToJsonBytes(etudiantsLicence)))
				.andExpect(status().isBadRequest());

		// Validate the EtudiantsLicence in the database
		List<EtudiantsLicence> etudiantsLicenceList = etudiantsLicenceRepository.findAll();
		assertThat(etudiantsLicenceList).hasSize(databaseSizeBeforeUpdate);
	}

	@Test
	@Transactional
	public void deleteEtudiantsLicence() throws Exception {
		// Initialize the database
		etudiantsLicenceRepository.save(etudiantsLicence);

		int databaseSizeBeforeDelete = etudiantsLicenceRepository.findAll().size();

		// Delete the etudiantsLicence
		restEtudiantsLicenceMockMvc.perform(
				delete("/api/etudiants-licences/{id}", etudiantsLicence.getId()).accept(TestUtil.APPLICATION_JSON_UTF8))
				.andExpect(status().isNoContent());

		// Validate the database contains one less item
		List<EtudiantsLicence> etudiantsLicenceList = etudiantsLicenceRepository.findAll();
		assertThat(etudiantsLicenceList).hasSize(databaseSizeBeforeDelete - 1);
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
