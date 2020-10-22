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
import org.springframework.validation.Validator;

import com.planeta.pfum.PfumApp;
import com.planeta.pfum.domain.AffectationModule;
import com.planeta.pfum.domain.Professeur;
import com.planeta.pfum.domain.User;
import com.planeta.pfum.repository.ProfesseurRepository;
import com.planeta.pfum.web.rest.errors.ExceptionTranslator;

/**
 * Integration tests for the {@Link ProfesseurResource} REST controller.
 */
@SpringBootTest(classes = PfumApp.class)
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
        final ProfesseurResource professeurResource = new ProfesseurResource(professeurRepository);
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
    public void getAllProfesseursByNomIsEqualToSomething() throws Exception {
        // Initialize the database
        professeurRepository.saveAndFlush(professeur);

        // Get all the professeurList where nom equals to DEFAULT_NOM
        defaultProfesseurShouldBeFound("nom.equals=" + DEFAULT_NOM);

        // Get all the professeurList where nom equals to UPDATED_NOM
        defaultProfesseurShouldNotBeFound("nom.equals=" + UPDATED_NOM);
    }

    @Test
    @Transactional
    public void getAllProfesseursByNomIsInShouldWork() throws Exception {
        // Initialize the database
        professeurRepository.saveAndFlush(professeur);

        // Get all the professeurList where nom in DEFAULT_NOM or UPDATED_NOM
        defaultProfesseurShouldBeFound("nom.in=" + DEFAULT_NOM + "," + UPDATED_NOM);

        // Get all the professeurList where nom equals to UPDATED_NOM
        defaultProfesseurShouldNotBeFound("nom.in=" + UPDATED_NOM);
    }

    @Test
    @Transactional
    public void getAllProfesseursByNomIsNullOrNotNull() throws Exception {
        // Initialize the database
        professeurRepository.saveAndFlush(professeur);

        // Get all the professeurList where nom is not null
        defaultProfesseurShouldBeFound("nom.specified=true");

        // Get all the professeurList where nom is null
        defaultProfesseurShouldNotBeFound("nom.specified=false");
    }

    @Test
    @Transactional
    public void getAllProfesseursByPrenomIsEqualToSomething() throws Exception {
        // Initialize the database
        professeurRepository.saveAndFlush(professeur);

        // Get all the professeurList where prenom equals to DEFAULT_PRENOM
        defaultProfesseurShouldBeFound("prenom.equals=" + DEFAULT_PRENOM);

        // Get all the professeurList where prenom equals to UPDATED_PRENOM
        defaultProfesseurShouldNotBeFound("prenom.equals=" + UPDATED_PRENOM);
    }

    @Test
    @Transactional
    public void getAllProfesseursByPrenomIsInShouldWork() throws Exception {
        // Initialize the database
        professeurRepository.saveAndFlush(professeur);

        // Get all the professeurList where prenom in DEFAULT_PRENOM or UPDATED_PRENOM
        defaultProfesseurShouldBeFound("prenom.in=" + DEFAULT_PRENOM + "," + UPDATED_PRENOM);

        // Get all the professeurList where prenom equals to UPDATED_PRENOM
        defaultProfesseurShouldNotBeFound("prenom.in=" + UPDATED_PRENOM);
    }

    @Test
    @Transactional
    public void getAllProfesseursByPrenomIsNullOrNotNull() throws Exception {
        // Initialize the database
        professeurRepository.saveAndFlush(professeur);

        // Get all the professeurList where prenom is not null
        defaultProfesseurShouldBeFound("prenom.specified=true");

        // Get all the professeurList where prenom is null
        defaultProfesseurShouldNotBeFound("prenom.specified=false");
    }

    @Test
    @Transactional
    public void getAllProfesseursByEtablissementIsEqualToSomething() throws Exception {
        // Initialize the database
        professeurRepository.saveAndFlush(professeur);

        // Get all the professeurList where etablissement equals to DEFAULT_ETABLISSEMENT
        defaultProfesseurShouldBeFound("etablissement.equals=" + DEFAULT_ETABLISSEMENT);

        // Get all the professeurList where etablissement equals to UPDATED_ETABLISSEMENT
        defaultProfesseurShouldNotBeFound("etablissement.equals=" + UPDATED_ETABLISSEMENT);
    }

    @Test
    @Transactional
    public void getAllProfesseursByEtablissementIsInShouldWork() throws Exception {
        // Initialize the database
        professeurRepository.saveAndFlush(professeur);

        // Get all the professeurList where etablissement in DEFAULT_ETABLISSEMENT or UPDATED_ETABLISSEMENT
        defaultProfesseurShouldBeFound("etablissement.in=" + DEFAULT_ETABLISSEMENT + "," + UPDATED_ETABLISSEMENT);

        // Get all the professeurList where etablissement equals to UPDATED_ETABLISSEMENT
        defaultProfesseurShouldNotBeFound("etablissement.in=" + UPDATED_ETABLISSEMENT);
    }

    @Test
    @Transactional
    public void getAllProfesseursByEtablissementIsNullOrNotNull() throws Exception {
        // Initialize the database
        professeurRepository.saveAndFlush(professeur);

        // Get all the professeurList where etablissement is not null
        defaultProfesseurShouldBeFound("etablissement.specified=true");

        // Get all the professeurList where etablissement is null
        defaultProfesseurShouldNotBeFound("etablissement.specified=false");
    }

    @Test
    @Transactional
    public void getAllProfesseursByGradeIsEqualToSomething() throws Exception {
        // Initialize the database
        professeurRepository.saveAndFlush(professeur);

        // Get all the professeurList where grade equals to DEFAULT_GRADE
        defaultProfesseurShouldBeFound("grade.equals=" + DEFAULT_GRADE);

        // Get all the professeurList where grade equals to UPDATED_GRADE
        defaultProfesseurShouldNotBeFound("grade.equals=" + UPDATED_GRADE);
    }

    @Test
    @Transactional
    public void getAllProfesseursByGradeIsInShouldWork() throws Exception {
        // Initialize the database
        professeurRepository.saveAndFlush(professeur);

        // Get all the professeurList where grade in DEFAULT_GRADE or UPDATED_GRADE
        defaultProfesseurShouldBeFound("grade.in=" + DEFAULT_GRADE + "," + UPDATED_GRADE);

        // Get all the professeurList where grade equals to UPDATED_GRADE
        defaultProfesseurShouldNotBeFound("grade.in=" + UPDATED_GRADE);
    }

    @Test
    @Transactional
    public void getAllProfesseursByGradeIsNullOrNotNull() throws Exception {
        // Initialize the database
        professeurRepository.saveAndFlush(professeur);

        // Get all the professeurList where grade is not null
        defaultProfesseurShouldBeFound("grade.specified=true");

        // Get all the professeurList where grade is null
        defaultProfesseurShouldNotBeFound("grade.specified=false");
    }

    @Test
    @Transactional
    public void getAllProfesseursByDiplomeIsEqualToSomething() throws Exception {
        // Initialize the database
        professeurRepository.saveAndFlush(professeur);

        // Get all the professeurList where diplome equals to DEFAULT_DIPLOME
        defaultProfesseurShouldBeFound("diplome.equals=" + DEFAULT_DIPLOME);

        // Get all the professeurList where diplome equals to UPDATED_DIPLOME
        defaultProfesseurShouldNotBeFound("diplome.equals=" + UPDATED_DIPLOME);
    }

    @Test
    @Transactional
    public void getAllProfesseursByDiplomeIsInShouldWork() throws Exception {
        // Initialize the database
        professeurRepository.saveAndFlush(professeur);

        // Get all the professeurList where diplome in DEFAULT_DIPLOME or UPDATED_DIPLOME
        defaultProfesseurShouldBeFound("diplome.in=" + DEFAULT_DIPLOME + "," + UPDATED_DIPLOME);

        // Get all the professeurList where diplome equals to UPDATED_DIPLOME
        defaultProfesseurShouldNotBeFound("diplome.in=" + UPDATED_DIPLOME);
    }

    @Test
    @Transactional
    public void getAllProfesseursByDiplomeIsNullOrNotNull() throws Exception {
        // Initialize the database
        professeurRepository.saveAndFlush(professeur);

        // Get all the professeurList where diplome is not null
        defaultProfesseurShouldBeFound("diplome.specified=true");

        // Get all the professeurList where diplome is null
        defaultProfesseurShouldNotBeFound("diplome.specified=false");
    }

    @Test
    @Transactional
    public void getAllProfesseursByCinIsEqualToSomething() throws Exception {
        // Initialize the database
        professeurRepository.saveAndFlush(professeur);

        // Get all the professeurList where cin equals to DEFAULT_CIN
        defaultProfesseurShouldBeFound("cin.equals=" + DEFAULT_CIN);

        // Get all the professeurList where cin equals to UPDATED_CIN
        defaultProfesseurShouldNotBeFound("cin.equals=" + UPDATED_CIN);
    }

    @Test
    @Transactional
    public void getAllProfesseursByCinIsInShouldWork() throws Exception {
        // Initialize the database
        professeurRepository.saveAndFlush(professeur);

        // Get all the professeurList where cin in DEFAULT_CIN or UPDATED_CIN
        defaultProfesseurShouldBeFound("cin.in=" + DEFAULT_CIN + "," + UPDATED_CIN);

        // Get all the professeurList where cin equals to UPDATED_CIN
        defaultProfesseurShouldNotBeFound("cin.in=" + UPDATED_CIN);
    }

    @Test
    @Transactional
    public void getAllProfesseursByCinIsNullOrNotNull() throws Exception {
        // Initialize the database
        professeurRepository.saveAndFlush(professeur);

        // Get all the professeurList where cin is not null
        defaultProfesseurShouldBeFound("cin.specified=true");

        // Get all the professeurList where cin is null
        defaultProfesseurShouldNotBeFound("cin.specified=false");
    }

    @Test
    @Transactional
    public void getAllProfesseursByRibIsEqualToSomething() throws Exception {
        // Initialize the database
        professeurRepository.saveAndFlush(professeur);

        // Get all the professeurList where rib equals to DEFAULT_RIB
        defaultProfesseurShouldBeFound("rib.equals=" + DEFAULT_RIB);

        // Get all the professeurList where rib equals to UPDATED_RIB
        defaultProfesseurShouldNotBeFound("rib.equals=" + UPDATED_RIB);
    }

    @Test
    @Transactional
    public void getAllProfesseursByRibIsInShouldWork() throws Exception {
        // Initialize the database
        professeurRepository.saveAndFlush(professeur);

        // Get all the professeurList where rib in DEFAULT_RIB or UPDATED_RIB
        defaultProfesseurShouldBeFound("rib.in=" + DEFAULT_RIB + "," + UPDATED_RIB);

        // Get all the professeurList where rib equals to UPDATED_RIB
        defaultProfesseurShouldNotBeFound("rib.in=" + UPDATED_RIB);
    }

    @Test
    @Transactional
    public void getAllProfesseursByRibIsNullOrNotNull() throws Exception {
        // Initialize the database
        professeurRepository.saveAndFlush(professeur);

        // Get all the professeurList where rib is not null
        defaultProfesseurShouldBeFound("rib.specified=true");

        // Get all the professeurList where rib is null
        defaultProfesseurShouldNotBeFound("rib.specified=false");
    }

    @Test
    @Transactional
    public void getAllProfesseursByEmailIsEqualToSomething() throws Exception {
        // Initialize the database
        professeurRepository.saveAndFlush(professeur);

        // Get all the professeurList where email equals to DEFAULT_EMAIL
        defaultProfesseurShouldBeFound("email.equals=" + DEFAULT_EMAIL);

        // Get all the professeurList where email equals to UPDATED_EMAIL
        defaultProfesseurShouldNotBeFound("email.equals=" + UPDATED_EMAIL);
    }

    @Test
    @Transactional
    public void getAllProfesseursByEmailIsInShouldWork() throws Exception {
        // Initialize the database
        professeurRepository.saveAndFlush(professeur);

        // Get all the professeurList where email in DEFAULT_EMAIL or UPDATED_EMAIL
        defaultProfesseurShouldBeFound("email.in=" + DEFAULT_EMAIL + "," + UPDATED_EMAIL);

        // Get all the professeurList where email equals to UPDATED_EMAIL
        defaultProfesseurShouldNotBeFound("email.in=" + UPDATED_EMAIL);
    }

    @Test
    @Transactional
    public void getAllProfesseursByEmailIsNullOrNotNull() throws Exception {
        // Initialize the database
        professeurRepository.saveAndFlush(professeur);

        // Get all the professeurList where email is not null
        defaultProfesseurShouldBeFound("email.specified=true");

        // Get all the professeurList where email is null
        defaultProfesseurShouldNotBeFound("email.specified=false");
    }

    @Test
    @Transactional
    public void getAllProfesseursByUserIsEqualToSomething() throws Exception {
        // Initialize the database
        User user = UserResourceIT.createEntity(em);
        em.persist(user);
        em.flush();
        professeur.setUser(user);
        professeurRepository.saveAndFlush(professeur);
        Long userId = user.getId();

        // Get all the professeurList where user equals to userId
        defaultProfesseurShouldBeFound("userId.equals=" + userId);

        // Get all the professeurList where user equals to userId + 1
        defaultProfesseurShouldNotBeFound("userId.equals=" + (userId + 1));
    }


    @Test
    @Transactional
    public void getAllProfesseursByAffectationModuleIsEqualToSomething() throws Exception {
        // Initialize the database
        AffectationModule affectationModule = AffectationModuleResourceIT.createEntity(em);
        em.persist(affectationModule);
        em.flush();
        professeur.addAffectationModule(affectationModule);
        professeurRepository.saveAndFlush(professeur);
        Long affectationModuleId = affectationModule.getId();

        // Get all the professeurList where affectationModule equals to affectationModuleId
        defaultProfesseurShouldBeFound("affectationModuleId.equals=" + affectationModuleId);

        // Get all the professeurList where affectationModule equals to affectationModuleId + 1
        defaultProfesseurShouldNotBeFound("affectationModuleId.equals=" + (affectationModuleId + 1));
    }

    /**
     * Executes the search, and checks that the default entity is returned.
     */
    private void defaultProfesseurShouldBeFound(String filter) throws Exception {
        restProfesseurMockMvc.perform(get("/api/professeurs?sort=id,desc&" + filter))
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

        // Check, that the count call also returns 1
        restProfesseurMockMvc.perform(get("/api/professeurs/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(content().string("1"));
    }

    /**
     * Executes the search, and checks that the default entity is not returned.
     */
    private void defaultProfesseurShouldNotBeFound(String filter) throws Exception {
        restProfesseurMockMvc.perform(get("/api/professeurs?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());

        // Check, that the count call also returns 0
        restProfesseurMockMvc.perform(get("/api/professeurs/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(content().string("0"));
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
    	professeurRepository.save(professeur);

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
    }

    @Test
    @Transactional
    public void deleteProfesseur() throws Exception {
        // Initialize the database
    	professeurRepository.save(professeur);

        int databaseSizeBeforeDelete = professeurRepository.findAll().size();

        // Delete the professeur
        restProfesseurMockMvc.perform(delete("/api/professeurs/{id}", professeur.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Professeur> professeurList = professeurRepository.findAll();
        assertThat(professeurList).hasSize(databaseSizeBeforeDelete - 1);
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
