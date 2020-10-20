package com.planeta.pfum.web.rest;

import com.planeta.pfum.domain.EspaceEtudiant;
import com.planeta.pfum.repository.EspaceEtudiantRepository;
import com.planeta.pfum.repository.search.EspaceEtudiantSearchRepository;
import com.planeta.pfum.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing {@link com.planeta.pfum.domain.EspaceEtudiant}.
 */
@RestController
@RequestMapping("/api")
public class EspaceEtudiantResource {

    private final Logger log = LoggerFactory.getLogger(EspaceEtudiantResource.class);

    private static final String ENTITY_NAME = "espaceEtudiant";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final EspaceEtudiantRepository espaceEtudiantRepository;

    private final EspaceEtudiantSearchRepository espaceEtudiantSearchRepository;

    public EspaceEtudiantResource(EspaceEtudiantRepository espaceEtudiantRepository, EspaceEtudiantSearchRepository espaceEtudiantSearchRepository) {
        this.espaceEtudiantRepository = espaceEtudiantRepository;
        this.espaceEtudiantSearchRepository = espaceEtudiantSearchRepository;
    }

    /**
     * {@code POST  /espace-etudiants} : Create a new espaceEtudiant.
     *
     * @param espaceEtudiant the espaceEtudiant to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new espaceEtudiant, or with status {@code 400 (Bad Request)} if the espaceEtudiant has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/espace-etudiants")
    public ResponseEntity<EspaceEtudiant> createEspaceEtudiant(@RequestBody EspaceEtudiant espaceEtudiant) throws URISyntaxException {
        log.debug("REST request to save EspaceEtudiant : {}", espaceEtudiant);
        if (espaceEtudiant.getId() != null) {
            throw new BadRequestAlertException("A new espaceEtudiant cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EspaceEtudiant result = espaceEtudiantRepository.save(espaceEtudiant);
        espaceEtudiantSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/espace-etudiants/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /espace-etudiants} : Updates an existing espaceEtudiant.
     *
     * @param espaceEtudiant the espaceEtudiant to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated espaceEtudiant,
     * or with status {@code 400 (Bad Request)} if the espaceEtudiant is not valid,
     * or with status {@code 500 (Internal Server Error)} if the espaceEtudiant couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/espace-etudiants")
    public ResponseEntity<EspaceEtudiant> updateEspaceEtudiant(@RequestBody EspaceEtudiant espaceEtudiant) throws URISyntaxException {
        log.debug("REST request to update EspaceEtudiant : {}", espaceEtudiant);
        if (espaceEtudiant.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        EspaceEtudiant result = espaceEtudiantRepository.save(espaceEtudiant);
        espaceEtudiantSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, espaceEtudiant.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /espace-etudiants} : get all the espaceEtudiants.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of espaceEtudiants in body.
     */
    @GetMapping("/espace-etudiants")
    public List<EspaceEtudiant> getAllEspaceEtudiants() {
        log.debug("REST request to get all EspaceEtudiants");
        return espaceEtudiantRepository.findAll();
    }

    /**
     * {@code GET  /espace-etudiants/:id} : get the "id" espaceEtudiant.
     *
     * @param id the id of the espaceEtudiant to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the espaceEtudiant, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/espace-etudiants/{id}")
    public ResponseEntity<EspaceEtudiant> getEspaceEtudiant(@PathVariable Long id) {
        log.debug("REST request to get EspaceEtudiant : {}", id);
        Optional<EspaceEtudiant> espaceEtudiant = espaceEtudiantRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(espaceEtudiant);
    }

    /**
     * {@code DELETE  /espace-etudiants/:id} : delete the "id" espaceEtudiant.
     *
     * @param id the id of the espaceEtudiant to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/espace-etudiants/{id}")
    public ResponseEntity<Void> deleteEspaceEtudiant(@PathVariable Long id) {
        log.debug("REST request to delete EspaceEtudiant : {}", id);
        espaceEtudiantRepository.deleteById(id);
        espaceEtudiantSearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/espace-etudiants?query=:query} : search for the espaceEtudiant corresponding
     * to the query.
     *
     * @param query the query of the espaceEtudiant search.
     * @return the result of the search.
     */
    @GetMapping("/_search/espace-etudiants")
    public List<EspaceEtudiant> searchEspaceEtudiants(@RequestParam String query) {
        log.debug("REST request to search EspaceEtudiants for query {}", query);
        return StreamSupport
            .stream(espaceEtudiantSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
