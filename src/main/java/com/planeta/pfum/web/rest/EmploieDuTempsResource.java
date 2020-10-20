package com.planeta.pfum.web.rest;

import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

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

import com.planeta.pfum.domain.EmploieDuTemps;
import com.planeta.pfum.repository.EmploieDuTempsRepository;
import com.planeta.pfum.repository.search.EmploieDuTempsSearchRepository;
import com.planeta.pfum.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.planeta.pfum.domain.EmploieDuTemps}.
 */
@RestController
@RequestMapping("/api")
public class EmploieDuTempsResource {

    private final Logger log = LoggerFactory.getLogger(EmploieDuTempsResource.class);

    private static final String ENTITY_NAME = "emploieDuTemps";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final EmploieDuTempsRepository emploieDuTempsRepository;

    private final EmploieDuTempsSearchRepository emploieDuTempsSearchRepository;

    public EmploieDuTempsResource(EmploieDuTempsRepository emploieDuTempsRepository, EmploieDuTempsSearchRepository emploieDuTempsSearchRepository) {
        this.emploieDuTempsRepository = emploieDuTempsRepository;
        this.emploieDuTempsSearchRepository = emploieDuTempsSearchRepository;
    }

    /**
     * {@code POST  /emploie-du-temps} : Create a new emploieDuTemps.
     *
     * @param emploieDuTemps the emploieDuTemps to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new emploieDuTemps, or with status {@code 400 (Bad Request)} if the emploieDuTemps has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/emploie-du-temps")
    public ResponseEntity<EmploieDuTemps> createEmploieDuTemps(@RequestBody EmploieDuTemps emploieDuTemps) throws URISyntaxException {
        log.debug("REST request to save EmploieDuTemps : {}", emploieDuTemps);
        if (emploieDuTemps.getId() != null) {
            throw new BadRequestAlertException("A new emploieDuTemps cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EmploieDuTemps result = emploieDuTempsRepository.save(emploieDuTemps);
        emploieDuTempsSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/emploie-du-temps/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /emploie-du-temps} : Updates an existing emploieDuTemps.
     *
     * @param emploieDuTemps the emploieDuTemps to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated emploieDuTemps,
     * or with status {@code 400 (Bad Request)} if the emploieDuTemps is not valid,
     * or with status {@code 500 (Internal Server Error)} if the emploieDuTemps couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/emploie-du-temps")
    public ResponseEntity<EmploieDuTemps> updateEmploieDuTemps(@RequestBody EmploieDuTemps emploieDuTemps) throws URISyntaxException {
        log.debug("REST request to update EmploieDuTemps : {}", emploieDuTemps);
        if (emploieDuTemps.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        EmploieDuTemps result = emploieDuTempsRepository.save(emploieDuTemps);
        emploieDuTempsSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, emploieDuTemps.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /emploie-du-temps} : get all the emploieDuTemps.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of emploieDuTemps in body.
     */
    @GetMapping("/emploie-du-temps")
    public List<EmploieDuTemps> getAllEmploieDuTemps() {
        log.debug("REST request to get all EmploieDuTemps");
        return emploieDuTempsRepository.findAll();
    }

    /**
     * {@code GET  /emploie-du-temps/:id} : get the "id" emploieDuTemps.
     *
     * @param id the id of the emploieDuTemps to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the emploieDuTemps, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/emploie-du-temps/{id}")
    public ResponseEntity<EmploieDuTemps> getEmploieDuTemps(@PathVariable Long id) {
        log.debug("REST request to get EmploieDuTemps : {}", id);
        Optional<EmploieDuTemps> emploieDuTemps = emploieDuTempsRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(emploieDuTemps);
    }

    /**
     * {@code DELETE  /emploie-du-temps/:id} : delete the "id" emploieDuTemps.
     *
     * @param id the id of the emploieDuTemps to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/emploie-du-temps/{id}")
    public ResponseEntity<Void> deleteEmploieDuTemps(@PathVariable Long id) {
        log.debug("REST request to delete EmploieDuTemps : {}", id);
        emploieDuTempsRepository.deleteById(id);
        emploieDuTempsSearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/emploie-du-temps?query=:query} : search for the emploieDuTemps corresponding
     * to the query.
     *
     * @param query the query of the emploieDuTemps search.
     * @return the result of the search.
     */
    @GetMapping("/_search/emploie-du-temps")
    public List<EmploieDuTemps> searchEmploieDuTemps(@RequestParam String query) {
        log.debug("REST request to search EmploieDuTemps for query {}", query);
        return StreamSupport
            .stream(emploieDuTempsSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
