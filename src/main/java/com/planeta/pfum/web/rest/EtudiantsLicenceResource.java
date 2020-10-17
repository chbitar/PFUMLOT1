package com.planeta.pfum.web.rest;

import com.planeta.pfum.domain.AffectationModule;
import com.planeta.pfum.domain.EtudiantsExecutif;
import com.planeta.pfum.domain.EtudiantsLicence;
import com.planeta.pfum.domain.EtudiantsMaster;
import com.planeta.pfum.domain.Filiere;
import com.planeta.pfum.domain.User;
import com.planeta.pfum.domain.enumeration.Semestre;
import com.planeta.pfum.repository.EtudiantsLicenceRepository;
import com.planeta.pfum.repository.FiliereRepository;
import com.planeta.pfum.repository.UserRepository;
import com.planeta.pfum.repository.search.EtudiantsLicenceSearchRepository;
import com.planeta.pfum.security.AuthoritiesConstants;
import com.planeta.pfum.security.SecurityUtils;
import com.planeta.pfum.service.UserService;
import com.planeta.pfum.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing {@link com.planeta.pfum.domain.EtudiantsLicence}.
 */
@RestController
@RequestMapping("/api")
public class EtudiantsLicenceResource {

    private final Logger log = LoggerFactory.getLogger(EtudiantsLicenceResource.class);

    private static final String ENTITY_NAME = "etudiantsLicence";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final EtudiantsLicenceRepository etudiantsLicenceRepository;

    private final EtudiantsLicenceSearchRepository etudiantsLicenceSearchRepository;

    private final FiliereRepository filiereRepository;

    private final UserService userService;
    
    private final UserRepository userRepository;
    
    
    public EtudiantsLicenceResource(EtudiantsLicenceRepository etudiantsLicenceRepository, EtudiantsLicenceSearchRepository etudiantsLicenceSearchRepository, FiliereRepository filiereRepository,UserRepository userRepository,UserService userService) {
        this.etudiantsLicenceRepository = etudiantsLicenceRepository;
        this.etudiantsLicenceSearchRepository = etudiantsLicenceSearchRepository;
        this.filiereRepository = filiereRepository;
        this.userRepository = userRepository;
        this.userService = userService;

        
    }

    /**
     * {@code POST  /etudiants-licences} : Create a new etudiantsLicence.
     *
     * @param etudiantsLicence the etudiantsLicence to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new etudiantsLicence, or with status {@code 400 (Bad Request)} if the etudiantsLicence has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/etudiants-licences")
    public ResponseEntity<EtudiantsLicence> createEtudiantsLicence(@Valid @RequestBody EtudiantsLicence etudiantsLicence) throws URISyntaxException {
        log.debug("REST request to save EtudiantsLicence : {}", etudiantsLicence);
        if (etudiantsLicence.getId() != null) {
            throw new BadRequestAlertException("A new etudiantsLicence cannot already have an ID", ENTITY_NAME, "idexists");
        }
        
        EtudiantsLicence result = etudiantsLicenceRepository.save(etudiantsLicence);
        
        Filiere filiere=  filiereRepository.findById(etudiantsLicence.getFiliere().getId()).get();
        String ecole = filiere.getEtablissement().getNomEcole();
        
        Calendar c = Calendar.getInstance();        
        int fourDigYear = c.get(Calendar.YEAR);
        
        String suffixe = "ES"+ Integer.toString(fourDigYear).substring(2);

        switch (ecole) {
            case "ESLSCA":
                suffixe = "ES"+ Integer.toString(fourDigYear).substring(2)   + customFormat("0000", result.getId());
                break;

            case "OSTELEA":
                suffixe = "OS"+ Integer.toString(fourDigYear).substring(2)   + customFormat("0000", result.getId());
                break;
            default:
                break;
        }
        
        //Creation d'un compte USER pour se connecter
        User newUser = userService.createUserForEtudiants(etudiantsLicence);
        etudiantsLicence.setUser(newUser);
        etudiantsLicence.setSuffixe(suffixe);

//        etudiantsLicenceSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/etudiants-licences/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /etudiants-licences} : Updates an existing etudiantsLicence.
     *
     * @param etudiantsLicence the etudiantsLicence to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated etudiantsLicence,
     * or with status {@code 400 (Bad Request)} if the etudiantsLicence is not valid,
     * or with status {@code 500 (Internal Server Error)} if the etudiantsLicence couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/etudiants-licences")
    public ResponseEntity<EtudiantsLicence> updateEtudiantsLicence(@Valid @RequestBody EtudiantsLicence etudiantsLicence) throws URISyntaxException {
        log.debug("REST request to update EtudiantsLicence : {}", etudiantsLicence);
        if (etudiantsLicence.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        EtudiantsLicence result = etudiantsLicenceRepository.save(etudiantsLicence);
//        etudiantsLicenceSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, etudiantsLicence.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /etudiants-licences} : get all the etudiantsLicences.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of etudiantsLicences in body.
     */
    @GetMapping("/etudiants-licences")
    public List<EtudiantsLicence> getAllEtudiantsLicences() {
        log.debug("REST request to get all EtudiantsLicences");
        
    	if (SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.ETUDIANT_LICENCE)) {
			Optional<User> user = userRepository.findOneByLogin(SecurityUtils.getCurrentUserLogin().get());
			return etudiantsLicenceRepository.findAllByUserId(user.get().getId());
		} 
        
        
        return etudiantsLicenceRepository.findAll();
    }

    /**
     * {@code GET  /etudiants-licences/:id} : get the "id" etudiantsLicence.
     *
     * @param id the id of the etudiantsLicence to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the etudiantsLicence, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/etudiants-licences/{id}")
    public ResponseEntity<EtudiantsLicence> getEtudiantsLicence(@PathVariable Long id) {
        log.debug("REST request to get EtudiantsLicence : {}", id);
        Optional<EtudiantsLicence> etudiantsLicence = etudiantsLicenceRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(etudiantsLicence);
    }

    /**
     * {@code DELETE  /etudiants-licences/:id} : delete the "id" etudiantsLicence.
     *
     * @param id the id of the etudiantsLicence to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/etudiants-licences/{id}")
    public ResponseEntity<Void> deleteEtudiantsLicence(@PathVariable Long id) {
        log.debug("REST request to delete EtudiantsLicence : {}", id);
        etudiantsLicenceRepository.deleteById(id);
//        etudiantsLicenceSearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/etudiants-licences?query=:query} : search for the etudiantsLicence corresponding
     * to the query.
     *
     * @param query the query of the etudiantsLicence search.
     * @return the result of the search.
     */
    @GetMapping("/_search/etudiants-licences")
    public List<EtudiantsLicence> searchEtudiantsLicences(@RequestParam String query) {
        log.debug("REST request to search EtudiantsLicences for query {}", query);
//        return StreamSupport
//           .stream(etudiantsLicenceSearchRepository.search(queryStringQuery(query)).spliterator(), false)
//            .collect(Collectors.toList());
        return new ArrayList<EtudiantsLicence>();

    }
    
    @GetMapping("/etudiants-licences/filiere/{fil}")
    public List<EtudiantsLicence> getAllEtudiantsLicencesByFiliere(@PathVariable Filiere fil) {
        log.debug("REST request to get all etudiants-licences");
        return etudiantsLicenceRepository.findAllByFiliere(fil);
    }
    private String customFormat(String pattern, long value ) {
        DecimalFormat myFormatter = new DecimalFormat(pattern);
        return myFormatter.format(value);
     }
}
