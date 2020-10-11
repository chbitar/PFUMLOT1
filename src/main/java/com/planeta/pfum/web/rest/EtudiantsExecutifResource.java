package com.planeta.pfum.web.rest;

import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;

import java.net.URI;
import java.net.URISyntaxException;
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

import com.planeta.pfum.domain.EtudiantsExecutif;
import com.planeta.pfum.domain.Filiere;
import com.planeta.pfum.domain.User;
import com.planeta.pfum.repository.EtudiantsExecutifRepository;
import com.planeta.pfum.repository.FiliereRepository;
import com.planeta.pfum.repository.UserRepository;
import com.planeta.pfum.repository.search.EtudiantsExecutifSearchRepository;
import com.planeta.pfum.security.AuthoritiesConstants;
import com.planeta.pfum.security.SecurityUtils;
import com.planeta.pfum.service.UserService;
import com.planeta.pfum.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.planeta.pfum.domain.EtudiantsExecutif}.
 */
@RestController
@RequestMapping("/api")
public class EtudiantsExecutifResource {

    private final Logger log = LoggerFactory.getLogger(EtudiantsExecutifResource.class);

    private static final String ENTITY_NAME = "etudiantsExecutif";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final EtudiantsExecutifRepository etudiantsExecutifRepository;

    private final EtudiantsExecutifSearchRepository etudiantsExecutifSearchRepository;

    private final FiliereRepository filiereRepository;
    
    private final UserService userService;
    private final UserRepository userRepository;

    
    


    public EtudiantsExecutifResource(EtudiantsExecutifRepository etudiantsExecutifRepository, EtudiantsExecutifSearchRepository etudiantsExecutifSearchRepository, FiliereRepository filiereRepository,UserService userService,UserRepository userRepository) {
        this.etudiantsExecutifRepository = etudiantsExecutifRepository;
        this.etudiantsExecutifSearchRepository = etudiantsExecutifSearchRepository;
        this.filiereRepository = filiereRepository;
        this.userService = userService;
        this.userRepository = userRepository;
    }

    /**
     * {@code POST  /etudiants-executifs} : Create a new etudiantsExecutif.
     *
     * @param etudiantsExecutif the etudiantsExecutif to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new etudiantsExecutif, or with status {@code 400 (Bad Request)} if the etudiantsExecutif has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/etudiants-executifs")
    public ResponseEntity<EtudiantsExecutif> createEtudiantsExecutif(@Valid @RequestBody EtudiantsExecutif etudiantsExecutif) throws URISyntaxException {
        log.debug("REST request to save EtudiantsExecutif : {}", etudiantsExecutif);
        if (etudiantsExecutif.getId() != null) {
            throw new BadRequestAlertException("A new etudiantsExecutif cannot already have an ID", ENTITY_NAME, "idexists");
       }
       
        EtudiantsExecutif result = etudiantsExecutifRepository.save(etudiantsExecutif);
        
        
        // formatage code etudiant
        Filiere filiere=  filiereRepository.findById(etudiantsExecutif.getFiliere().getId()).get();
        String ecole = filiere.getEtablissement().getNomEcole();

        String suffixe = "ES20";

        switch (ecole) {
            case "ESLSCA":
                suffixe = "ES20" + result.getId();
                break;

            case "OSTELEA":
                suffixe = "OS20" + result.getId();
                break;
            default:
                break;
        }
        
        //Creation d'un compte USER pour se connecter
        User newUser = userService.createUserForEtudiantsExecutif(etudiantsExecutif);
        etudiantsExecutif.setUser(newUser);
        
        result.setSuffixe(suffixe);

        etudiantsExecutifRepository.save(etudiantsExecutif);
       //
        etudiantsExecutifSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/etudiants-executifs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /etudiants-executifs} : Updates an existing etudiantsExecutif.
     *
     * @param etudiantsExecutif the etudiantsExecutif to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated etudiantsExecutif,
     * or with status {@code 400 (Bad Request)} if the etudiantsExecutif is not valid,
     * or with status {@code 500 (Internal Server Error)} if the etudiantsExecutif couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/etudiants-executifs")
    public ResponseEntity<EtudiantsExecutif> updateEtudiantsExecutif(@Valid @RequestBody EtudiantsExecutif etudiantsExecutif) throws URISyntaxException {
        log.debug("REST request to update EtudiantsExecutif : {}", etudiantsExecutif);
        if (etudiantsExecutif.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        EtudiantsExecutif result = etudiantsExecutifRepository.save(etudiantsExecutif);
        etudiantsExecutifSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, etudiantsExecutif.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /etudiants-executifs} : get all the etudiantsExecutifs.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of etudiantsExecutifs in body.
     */
    @GetMapping("/etudiants-executifs")
    public List<EtudiantsExecutif> getAllEtudiantsExecutifs() {
        log.debug("REST request to get all EtudiantsExecutifs");
        
        
    	if (SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.ETUDIANT)) {
			Optional<User> user = userRepository.findOneByLogin(SecurityUtils.getCurrentUserLogin().get());

			return etudiantsExecutifRepository.findAllByUserId(user.get().getId());
		} 
        
        return etudiantsExecutifRepository.findAll();
    }

    /**
     * {@code GET  /etudiants-executifs/:id} : get the "id" etudiantsExecutif.
     *
     * @param id the id of the etudiantsExecutif to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the etudiantsExecutif, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/etudiants-executifs/{id}")
    public ResponseEntity<EtudiantsExecutif> getEtudiantsExecutif(@PathVariable Long id) {
        log.debug("REST request to get EtudiantsExecutif : {}", id);
        Optional<EtudiantsExecutif> etudiantsExecutif = etudiantsExecutifRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(etudiantsExecutif);
    }

    /**
     * {@code DELETE  /etudiants-executifs/:id} : delete the "id" etudiantsExecutif.
     *
     * @param id the id of the etudiantsExecutif to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/etudiants-executifs/{id}")
    public ResponseEntity<Void> deleteEtudiantsExecutif(@PathVariable Long id) {
        log.debug("REST request to delete EtudiantsExecutif : {}", id);
        etudiantsExecutifRepository.deleteById(id);
        etudiantsExecutifSearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/etudiants-executifs?query=:query} : search for the etudiantsExecutif corresponding
     * to the query.
     *
     * @param query the query of the etudiantsExecutif search.
     * @return the result of the search.
     */
    @GetMapping("/_search/etudiants-executifs")
    public List<EtudiantsExecutif> searchEtudiantsExecutifs(@RequestParam String query) {
        log.debug("REST request to search EtudiantsExecutifs for query {}", query);
        return StreamSupport
            .stream(etudiantsExecutifSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

    //CHT
    @GetMapping("/etudiants-executifs/filiere/{fil}")
    public List<EtudiantsExecutif> getAllEtudiantsExecutifsByFiliere(@PathVariable Filiere fil) {
        log.debug("REST request to get all etudiants-executifs");
        return etudiantsExecutifRepository.findAllByFiliere(fil);
    }
    //CHT

}

