package com.planeta.pfum.web.rest;

import com.planeta.pfum.domain.NoteMaster;
import com.planeta.pfum.repository.NoteMasterRepository;
import com.planeta.pfum.repository.search.NoteMasterSearchRepository;
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
 * REST controller for managing {@link com.planeta.pfum.domain.NoteMaster}.
 */
@RestController
@RequestMapping("/api")
public class NoteMasterResource {

    private final Logger log = LoggerFactory.getLogger(NoteMasterResource.class);

    private static final String ENTITY_NAME = "noteMaster";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final NoteMasterRepository noteMasterRepository;

    private final NoteMasterSearchRepository noteMasterSearchRepository;

    public NoteMasterResource(NoteMasterRepository noteMasterRepository, NoteMasterSearchRepository noteMasterSearchRepository) {
        this.noteMasterRepository = noteMasterRepository;
        this.noteMasterSearchRepository = noteMasterSearchRepository;
    }

    /**
     * {@code POST  /note-masters} : Create a new noteMaster.
     *
     * @param noteMaster the noteMaster to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new noteMaster, or with status {@code 400 (Bad Request)} if the noteMaster has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/note-masters")
    public ResponseEntity<NoteMaster> createNoteMaster(@RequestBody NoteMaster noteMaster) throws URISyntaxException {
        log.debug("REST request to save NoteMaster : {}", noteMaster);
        if (noteMaster.getId() != null) {
            throw new BadRequestAlertException("A new noteMaster cannot already have an ID", ENTITY_NAME, "idexists");
        }
        NoteMaster result = noteMasterRepository.save(noteMaster);
        noteMasterSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/note-masters/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /note-masters} : Updates an existing noteMaster.
     *
     * @param noteMaster the noteMaster to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated noteMaster,
     * or with status {@code 400 (Bad Request)} if the noteMaster is not valid,
     * or with status {@code 500 (Internal Server Error)} if the noteMaster couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/note-masters")
    public ResponseEntity<NoteMaster> updateNoteMaster(@RequestBody NoteMaster noteMaster) throws URISyntaxException {
        log.debug("REST request to update NoteMaster : {}", noteMaster);
        if (noteMaster.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        NoteMaster result = noteMasterRepository.save(noteMaster);
        noteMasterSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, noteMaster.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /note-masters} : get all the noteMasters.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of noteMasters in body.
     */
    @GetMapping("/note-masters")
    public List<NoteMaster> getAllNoteMasters() {
        log.debug("REST request to get all NoteMasters");
        return noteMasterRepository.findAll();
    }

    /**
     * {@code GET  /note-masters/:id} : get the "id" noteMaster.
     *
     * @param id the id of the noteMaster to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the noteMaster, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/note-masters/{id}")
    public ResponseEntity<NoteMaster> getNoteMaster(@PathVariable Long id) {
        log.debug("REST request to get NoteMaster : {}", id);
        Optional<NoteMaster> noteMaster = noteMasterRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(noteMaster);
    }

    /**
     * {@code DELETE  /note-masters/:id} : delete the "id" noteMaster.
     *
     * @param id the id of the noteMaster to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/note-masters/{id}")
    public ResponseEntity<Void> deleteNoteMaster(@PathVariable Long id) {
        log.debug("REST request to delete NoteMaster : {}", id);
        noteMasterRepository.deleteById(id);
        noteMasterSearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/note-masters?query=:query} : search for the noteMaster corresponding
     * to the query.
     *
     * @param query the query of the noteMaster search.
     * @return the result of the search.
     */
    @GetMapping("/_search/note-masters")
    public List<NoteMaster> searchNoteMasters(@RequestParam String query) {
        log.debug("REST request to search NoteMasters for query {}", query);
        return StreamSupport
            .stream(noteMasterSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
