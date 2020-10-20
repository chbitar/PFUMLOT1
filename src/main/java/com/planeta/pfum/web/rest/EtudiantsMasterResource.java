package com.planeta.pfum.web.rest;

import com.planeta.pfum.domain.EtudiantsMaster;
import com.planeta.pfum.repository.EtudiantsMasterRepository;
import com.planeta.pfum.repository.search.EtudiantsMasterSearchRepository;
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

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

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

    public EtudiantsMasterResource(EtudiantsMasterRepository etudiantsMasterRepository, EtudiantsMasterSearchRepository etudiantsMasterSearchRepository) {
        this.etudiantsMasterRepository = etudiantsMasterRepository;
        this.etudiantsMasterSearchRepository = etudiantsMasterSearchRepository;
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
        etudiantsMasterSearchRepository.save(result);
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
        etudiantsMasterSearchRepository.save(result);
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
        etudiantsMasterSearchRepository.deleteById(id);
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
        return StreamSupport
            .stream(etudiantsMasterSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
