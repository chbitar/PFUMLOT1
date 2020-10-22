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
import com.planeta.pfum.domain.AnneeInscription;
import com.planeta.pfum.domain.Etablissement;
import com.planeta.pfum.domain.EtudiantsExecutif;
import com.planeta.pfum.domain.EtudiantsLicence;
import com.planeta.pfum.domain.EtudiantsMaster;
import com.planeta.pfum.domain.Filiere;
import com.planeta.pfum.domain.Module;
import com.planeta.pfum.domain.TableauDeBoard;
import com.planeta.pfum.domain.enumeration.Programme;
import com.planeta.pfum.repository.FiliereRepository;
import com.planeta.pfum.web.rest.errors.ExceptionTranslator;
/**
 * Integration tests for the {@Link FiliereResource} REST controller.
 */
@SpringBootTest(classes = PfumApp.class)
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
        final FiliereResource filiereResource = new FiliereResource(filiereRepository);
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
    public void getAllFilieresByNomfiliereIsEqualToSomething() throws Exception {
        // Initialize the database
        filiereRepository.saveAndFlush(filiere);

        // Get all the filiereList where nomfiliere equals to DEFAULT_NOMFILIERE
        defaultFiliereShouldBeFound("nomfiliere.equals=" + DEFAULT_NOMFILIERE);

        // Get all the filiereList where nomfiliere equals to UPDATED_NOMFILIERE
        defaultFiliereShouldNotBeFound("nomfiliere.equals=" + UPDATED_NOMFILIERE);
    }

    @Test
    @Transactional
    public void getAllFilieresByNomfiliereIsInShouldWork() throws Exception {
        // Initialize the database
        filiereRepository.saveAndFlush(filiere);

        // Get all the filiereList where nomfiliere in DEFAULT_NOMFILIERE or UPDATED_NOMFILIERE
        defaultFiliereShouldBeFound("nomfiliere.in=" + DEFAULT_NOMFILIERE + "," + UPDATED_NOMFILIERE);

        // Get all the filiereList where nomfiliere equals to UPDATED_NOMFILIERE
        defaultFiliereShouldNotBeFound("nomfiliere.in=" + UPDATED_NOMFILIERE);
    }

    @Test
    @Transactional
    public void getAllFilieresByNomfiliereIsNullOrNotNull() throws Exception {
        // Initialize the database
        filiereRepository.saveAndFlush(filiere);

        // Get all the filiereList where nomfiliere is not null
        defaultFiliereShouldBeFound("nomfiliere.specified=true");

        // Get all the filiereList where nomfiliere is null
        defaultFiliereShouldNotBeFound("nomfiliere.specified=false");
    }

    @Test
    @Transactional
    public void getAllFilieresByResponsableIsEqualToSomething() throws Exception {
        // Initialize the database
        filiereRepository.saveAndFlush(filiere);

        // Get all the filiereList where responsable equals to DEFAULT_RESPONSABLE
        defaultFiliereShouldBeFound("responsable.equals=" + DEFAULT_RESPONSABLE);

        // Get all the filiereList where responsable equals to UPDATED_RESPONSABLE
        defaultFiliereShouldNotBeFound("responsable.equals=" + UPDATED_RESPONSABLE);
    }

    @Test
    @Transactional
    public void getAllFilieresByResponsableIsInShouldWork() throws Exception {
        // Initialize the database
        filiereRepository.saveAndFlush(filiere);

        // Get all the filiereList where responsable in DEFAULT_RESPONSABLE or UPDATED_RESPONSABLE
        defaultFiliereShouldBeFound("responsable.in=" + DEFAULT_RESPONSABLE + "," + UPDATED_RESPONSABLE);

        // Get all the filiereList where responsable equals to UPDATED_RESPONSABLE
        defaultFiliereShouldNotBeFound("responsable.in=" + UPDATED_RESPONSABLE);
    }

    @Test
    @Transactional
    public void getAllFilieresByResponsableIsNullOrNotNull() throws Exception {
        // Initialize the database
        filiereRepository.saveAndFlush(filiere);

        // Get all the filiereList where responsable is not null
        defaultFiliereShouldBeFound("responsable.specified=true");

        // Get all the filiereList where responsable is null
        defaultFiliereShouldNotBeFound("responsable.specified=false");
    }

    @Test
    @Transactional
    public void getAllFilieresByAccreditaionIsEqualToSomething() throws Exception {
        // Initialize the database
        filiereRepository.saveAndFlush(filiere);

        // Get all the filiereList where accreditaion equals to DEFAULT_ACCREDITAION
        defaultFiliereShouldBeFound("accreditaion.equals=" + DEFAULT_ACCREDITAION);

        // Get all the filiereList where accreditaion equals to UPDATED_ACCREDITAION
        defaultFiliereShouldNotBeFound("accreditaion.equals=" + UPDATED_ACCREDITAION);
    }

    @Test
    @Transactional
    public void getAllFilieresByAccreditaionIsInShouldWork() throws Exception {
        // Initialize the database
        filiereRepository.saveAndFlush(filiere);

        // Get all the filiereList where accreditaion in DEFAULT_ACCREDITAION or UPDATED_ACCREDITAION
        defaultFiliereShouldBeFound("accreditaion.in=" + DEFAULT_ACCREDITAION + "," + UPDATED_ACCREDITAION);

        // Get all the filiereList where accreditaion equals to UPDATED_ACCREDITAION
        defaultFiliereShouldNotBeFound("accreditaion.in=" + UPDATED_ACCREDITAION);
    }

    @Test
    @Transactional
    public void getAllFilieresByAccreditaionIsNullOrNotNull() throws Exception {
        // Initialize the database
        filiereRepository.saveAndFlush(filiere);

        // Get all the filiereList where accreditaion is not null
        defaultFiliereShouldBeFound("accreditaion.specified=true");

        // Get all the filiereList where accreditaion is null
        defaultFiliereShouldNotBeFound("accreditaion.specified=false");
    }

    @Test
    @Transactional
    public void getAllFilieresByProgrammeIsEqualToSomething() throws Exception {
        // Initialize the database
        filiereRepository.saveAndFlush(filiere);

        // Get all the filiereList where programme equals to DEFAULT_PROGRAMME
        defaultFiliereShouldBeFound("programme.equals=" + DEFAULT_PROGRAMME);

        // Get all the filiereList where programme equals to UPDATED_PROGRAMME
        defaultFiliereShouldNotBeFound("programme.equals=" + UPDATED_PROGRAMME);
    }

    @Test
    @Transactional
    public void getAllFilieresByProgrammeIsInShouldWork() throws Exception {
        // Initialize the database
        filiereRepository.saveAndFlush(filiere);

        // Get all the filiereList where programme in DEFAULT_PROGRAMME or UPDATED_PROGRAMME
        defaultFiliereShouldBeFound("programme.in=" + DEFAULT_PROGRAMME + "," + UPDATED_PROGRAMME);

        // Get all the filiereList where programme equals to UPDATED_PROGRAMME
        defaultFiliereShouldNotBeFound("programme.in=" + UPDATED_PROGRAMME);
    }

    @Test
    @Transactional
    public void getAllFilieresByProgrammeIsNullOrNotNull() throws Exception {
        // Initialize the database
        filiereRepository.saveAndFlush(filiere);

        // Get all the filiereList where programme is not null
        defaultFiliereShouldBeFound("programme.specified=true");

        // Get all the filiereList where programme is null
        defaultFiliereShouldNotBeFound("programme.specified=false");
    }

    @Test
    @Transactional
    public void getAllFilieresByEtudiantsExecutifIsEqualToSomething() throws Exception {
        // Initialize the database
        EtudiantsExecutif etudiantsExecutif = EtudiantsExecutifResourceIT.createEntity(em);
        em.persist(etudiantsExecutif);
        em.flush();
        filiere.addEtudiantsExecutif(etudiantsExecutif);
        filiereRepository.saveAndFlush(filiere);
        Long etudiantsExecutifId = etudiantsExecutif.getId();

        // Get all the filiereList where etudiantsExecutif equals to etudiantsExecutifId
        defaultFiliereShouldBeFound("etudiantsExecutifId.equals=" + etudiantsExecutifId);

        // Get all the filiereList where etudiantsExecutif equals to etudiantsExecutifId + 1
        defaultFiliereShouldNotBeFound("etudiantsExecutifId.equals=" + (etudiantsExecutifId + 1));
    }


    @Test
    @Transactional
    public void getAllFilieresByEtudiantsLicenceIsEqualToSomething() throws Exception {
        // Initialize the database
        EtudiantsLicence etudiantsLicence = EtudiantsLicenceResourceIT.createEntity(em);
        em.persist(etudiantsLicence);
        em.flush();
        filiere.addEtudiantsLicence(etudiantsLicence);
        filiereRepository.saveAndFlush(filiere);
        Long etudiantsLicenceId = etudiantsLicence.getId();

        // Get all the filiereList where etudiantsLicence equals to etudiantsLicenceId
        defaultFiliereShouldBeFound("etudiantsLicenceId.equals=" + etudiantsLicenceId);

        // Get all the filiereList where etudiantsLicence equals to etudiantsLicenceId + 1
        defaultFiliereShouldNotBeFound("etudiantsLicenceId.equals=" + (etudiantsLicenceId + 1));
    }


    @Test
    @Transactional
    public void getAllFilieresByEtudiantsMasterIsEqualToSomething() throws Exception {
        // Initialize the database
        EtudiantsMaster etudiantsMaster = EtudiantsMasterResourceIT.createEntity(em);
        em.persist(etudiantsMaster);
        em.flush();
        filiere.addEtudiantsMaster(etudiantsMaster);
        filiereRepository.saveAndFlush(filiere);
        Long etudiantsMasterId = etudiantsMaster.getId();

        // Get all the filiereList where etudiantsMaster equals to etudiantsMasterId
        defaultFiliereShouldBeFound("etudiantsMasterId.equals=" + etudiantsMasterId);

        // Get all the filiereList where etudiantsMaster equals to etudiantsMasterId + 1
        defaultFiliereShouldNotBeFound("etudiantsMasterId.equals=" + (etudiantsMasterId + 1));
    }


    @Test
    @Transactional
    public void getAllFilieresByModuleIsEqualToSomething() throws Exception {
        // Initialize the database
        Module module = ModuleResourceIT.createEntity(em);
        em.persist(module);
        em.flush();
        filiere.addModule(module);
        filiereRepository.saveAndFlush(filiere);
        Long moduleId = module.getId();

        // Get all the filiereList where module equals to moduleId
        defaultFiliereShouldBeFound("moduleId.equals=" + moduleId);

        // Get all the filiereList where module equals to moduleId + 1
        defaultFiliereShouldNotBeFound("moduleId.equals=" + (moduleId + 1));
    }


    @Test
    @Transactional
    public void getAllFilieresByEtablissementIsEqualToSomething() throws Exception {
        // Initialize the database
        Etablissement etablissement = EtablissementResourceIT.createEntity(em);
        em.persist(etablissement);
        em.flush();
        filiere.setEtablissement(etablissement);
        filiereRepository.saveAndFlush(filiere);
        Long etablissementId = etablissement.getId();

        // Get all the filiereList where etablissement equals to etablissementId
        defaultFiliereShouldBeFound("etablissementId.equals=" + etablissementId);

        // Get all the filiereList where etablissement equals to etablissementId + 1
        defaultFiliereShouldNotBeFound("etablissementId.equals=" + (etablissementId + 1));
    }


    @Test
    @Transactional
    public void getAllFilieresByAnneeInscriptionIsEqualToSomething() throws Exception {
        // Initialize the database
        AnneeInscription anneeInscription = AnneeInscriptionResourceIT.createEntity(em);
        em.persist(anneeInscription);
        em.flush();
        filiere.setAnneeInscription(anneeInscription);
        filiereRepository.saveAndFlush(filiere);
        Long anneeInscriptionId = anneeInscription.getId();

        // Get all the filiereList where anneeInscription equals to anneeInscriptionId
        defaultFiliereShouldBeFound("anneeInscriptionId.equals=" + anneeInscriptionId);

        // Get all the filiereList where anneeInscription equals to anneeInscriptionId + 1
        defaultFiliereShouldNotBeFound("anneeInscriptionId.equals=" + (anneeInscriptionId + 1));
    }


    @Test
    @Transactional
    public void getAllFilieresByBoardIsEqualToSomething() throws Exception {
        // Initialize the database
        TableauDeBoard board = TableauDeBoardResourceIT.createEntity(em);
        em.persist(board);
        em.flush();
        filiere.addBoard(board);
        filiereRepository.saveAndFlush(filiere);
        Long boardId = board.getId();

        // Get all the filiereList where board equals to boardId
        defaultFiliereShouldBeFound("boardId.equals=" + boardId);

        // Get all the filiereList where board equals to boardId + 1
        defaultFiliereShouldNotBeFound("boardId.equals=" + (boardId + 1));
    }

    /**
     * Executes the search, and checks that the default entity is returned.
     */
    private void defaultFiliereShouldBeFound(String filter) throws Exception {
        restFiliereMockMvc.perform(get("/api/filieres?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(filiere.getId().intValue())))
            .andExpect(jsonPath("$.[*].nomfiliere").value(hasItem(DEFAULT_NOMFILIERE)))
            .andExpect(jsonPath("$.[*].responsable").value(hasItem(DEFAULT_RESPONSABLE)))
            .andExpect(jsonPath("$.[*].accreditaion").value(hasItem(DEFAULT_ACCREDITAION)))
            .andExpect(jsonPath("$.[*].programme").value(hasItem(DEFAULT_PROGRAMME.toString())));

        // Check, that the count call also returns 1
        restFiliereMockMvc.perform(get("/api/filieres/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(content().string("1"));
    }

    /**
     * Executes the search, and checks that the default entity is not returned.
     */
    private void defaultFiliereShouldNotBeFound(String filter) throws Exception {
        restFiliereMockMvc.perform(get("/api/filieres?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());

        // Check, that the count call also returns 0
        restFiliereMockMvc.perform(get("/api/filieres/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(content().string("0"));
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
    	filiereRepository.save(filiere);

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
    }

    @Test
    @Transactional
    public void deleteFiliere() throws Exception {
        // Initialize the database
    	filiereRepository.save(filiere);

        int databaseSizeBeforeDelete = filiereRepository.findAll().size();

        // Delete the filiere
        restFiliereMockMvc.perform(delete("/api/filieres/{id}", filiere.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Filiere> filiereList = filiereRepository.findAll();
        assertThat(filiereList).hasSize(databaseSizeBeforeDelete - 1);
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
