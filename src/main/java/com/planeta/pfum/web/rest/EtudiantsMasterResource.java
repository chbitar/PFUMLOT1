package com.planeta.pfum.web.rest;

import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;

import java.net.URI;
import java.net.URISyntaxException;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.planeta.pfum.domain.EtudiantsLicence;
import com.planeta.pfum.domain.EtudiantsMaster;
import com.planeta.pfum.domain.Filiere;
import com.planeta.pfum.domain.User;
import com.planeta.pfum.repository.EtudiantsMasterRepository;
import com.planeta.pfum.repository.FiliereRepository;
import com.planeta.pfum.repository.UserRepository;
import com.planeta.pfum.repository.search.EtudiantsMasterSearchRepository;
import com.planeta.pfum.security.AuthoritiesConstants;
import com.planeta.pfum.security.SecurityUtils;
import com.planeta.pfum.service.UserService;
import com.planeta.pfum.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.planeta.pfum.domain.EtudiantsMaster}.
 */
@RestController
@RequestMapping("/api")
public class EtudiantsMasterResource {

    private final Logger log = LoggerFactory.getLogger(EtudiantsMasterResource.class);

    private static final String ENTITY_NAME = "etudiantsMaster";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final EtudiantsMasterRepository etudiantsMasterRepository;

    private final EtudiantsMasterSearchRepository etudiantsMasterSearchRepository;

    private final FiliereRepository filiereRepository;
    
    
    private final UserService userService;
    
    private final UserRepository userRepository;

    public EtudiantsMasterResource(EtudiantsMasterRepository etudiantsMasterRepository, EtudiantsMasterSearchRepository etudiantsMasterSearchRepository, FiliereRepository filiereRepository,UserRepository userRepository,UserService userService) {
        this.etudiantsMasterRepository = etudiantsMasterRepository;
        this.etudiantsMasterSearchRepository = etudiantsMasterSearchRepository;
        this.filiereRepository = filiereRepository;
        this.userRepository = userRepository;
        this.userService = userService;
    }

    
    /**
     * {@code POST  /etudiants-masters} : Create a new etudiantsMaster.
     *
     * @param etudiantsMaster the etudiantsMaster to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new etudiantsMaster, or with status {@code 400 (Bad Request)} if the etudiantsMaster has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/etudiants-masters")
    public ResponseEntity<EtudiantsMaster> createEtudiantsMaster(@Valid @RequestBody EtudiantsMaster etudiantsMaster) throws URISyntaxException {
        log.debug("REST request to save EtudiantsMaster : {}", etudiantsMaster);
        if (etudiantsMaster.getId() != null) {
            throw new BadRequestAlertException("A new etudiantsMaster cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EtudiantsMaster result = etudiantsMasterRepository.save(etudiantsMaster);

        // formatage code etudiant

        int fourDigYear =Calendar.getInstance().get(Calendar.YEAR);;
        String suffixe = "OS"+ Integer.toString(fourDigYear).substring(2)  + customFormat("0000", result.getId());
        
        //Creation d'un compte USER pour se connecter
        User newUser = userService.createUserForEtudiants(etudiantsMaster);
        etudiantsMaster.setUser(newUser);
        etudiantsMaster.setSuffixe(suffixe);

        etudiantsMasterRepository.save(etudiantsMaster);
        
//        etudiantsMasterSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/etudiants-masters/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /etudiants-masters} : Updates an existing etudiantsMaster.
     *
     * @param etudiantsMaster the etudiantsMaster to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated etudiantsMaster,
     * or with status {@code 400 (Bad Request)} if the etudiantsMaster is not valid,
     * or with status {@code 500 (Internal Server Error)} if the etudiantsMaster couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/etudiants-masters")
    public ResponseEntity<EtudiantsMaster> updateEtudiantsMaster(@Valid @RequestBody EtudiantsMaster etudiantsMaster) throws URISyntaxException {
        log.debug("REST request to update EtudiantsMaster : {}", etudiantsMaster);
        if (etudiantsMaster.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        EtudiantsMaster result = etudiantsMasterRepository.save(etudiantsMaster);
//        etudiantsMasterSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, etudiantsMaster.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /etudiants-masters} : get all the etudiantsMasters.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of etudiantsMasters in body.
     */
    @GetMapping("/etudiants-masters")
    public List<EtudiantsMaster> getAllEtudiantsMasters() {
        log.debug("REST request to get all EtudiantsMasters");
        
    	if (SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.ETUDIANT_MASTER)) {
			Optional<User> user = userRepository.findOneByLogin(SecurityUtils.getCurrentUserLogin().get());
			return etudiantsMasterRepository.findAllByUserId(user.get().getId());
		} 
    	
        return etudiantsMasterRepository.findAll();

    }

    /**
     * {@code GET  /etudiants-masters/:id} : get the "id" etudiantsMaster.
     *
     * @param id the id of the etudiantsMaster to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the etudiantsMaster, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/etudiants-masters/{id}")
    public ResponseEntity<EtudiantsMaster> getEtudiantsMaster(@PathVariable Long id) {
        log.debug("REST request to get EtudiantsMaster : {}", id);
        Optional<EtudiantsMaster> etudiantsMaster = etudiantsMasterRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(etudiantsMaster);
    }

    /**
     * {@code DELETE  /etudiants-masters/:id} : delete the "id" etudiantsMaster.
     *
     * @param id the id of the etudiantsMaster to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/etudiants-masters/{id}")
    public ResponseEntity<Void> deleteEtudiantsMaster(@PathVariable Long id) {
        log.debug("REST request to delete EtudiantsMaster : {}", id);
        etudiantsMasterRepository.deleteById(id);
//        etudiantsMasterSearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/etudiants-masters?query=:query} : search for the etudiantsMaster corresponding
     * to the query.
     *
     * @param query the query of the etudiantsMaster search.
     * @return the result of the search.
     */
    @GetMapping("/_search/etudiants-masters")
    public List<EtudiantsMaster> searchEtudiantsMasters(@RequestParam String query) {
        log.debug("REST request to search EtudiantsMasters for query {}", query);
//        return StreamSupport
//            .stream(etudiantsMasterSearchRepository.search(queryStringQuery(query)).spliterator(), false)
//            .collect(Collectors.toList());
        
        return new ArrayList<EtudiantsMaster>();

    }

    @GetMapping("/etudiants-masters/filiere/{fil}")
    public List<EtudiantsMaster> getAllEtudiantsMasterByFiliere(@PathVariable Filiere fil) {
        log.debug("REST request to get all etudiants-masters");
        return etudiantsMasterRepository.findAllByFiliere(fil);
    }

    private String customFormat(String pattern, long value ) {
        DecimalFormat myFormatter = new DecimalFormat(pattern);
        return myFormatter.format(value);
     }

}
