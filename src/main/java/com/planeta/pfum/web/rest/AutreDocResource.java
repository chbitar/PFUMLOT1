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

import com.planeta.pfum.domain.AutreDoc;
import com.planeta.pfum.repository.AutreDocRepository;
import com.planeta.pfum.repository.search.AutreDocSearchRepository;
import com.planeta.pfum.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.planeta.pfum.domain.AutreDoc}.
 */
@RestController
@RequestMapping("/api")
public class AutreDocResource {

    private final Logger log = LoggerFactory.getLogger(AutreDocResource.class);

    private static final String ENTITY_NAME = "autreDoc";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AutreDocRepository autreDocRepository;

    private final AutreDocSearchRepository autreDocSearchRepository;

    public AutreDocResource(AutreDocRepository autreDocRepository, AutreDocSearchRepository autreDocSearchRepository) {
        this.autreDocRepository = autreDocRepository;
        this.autreDocSearchRepository = autreDocSearchRepository;
    }

    /**
     * {@code POST  /autre-docs} : Create a new autreDoc.
     *
     * @param autreDoc the autreDoc to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new autreDoc, or with status {@code 400 (Bad Request)} if the autreDoc has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/autre-docs")
    public ResponseEntity<AutreDoc> createAutreDoc(@RequestBody AutreDoc autreDoc) throws URISyntaxException {
        log.debug("REST request to save AutreDoc : {}", autreDoc);
        if (autreDoc.getId() != null) {
            throw new BadRequestAlertException("A new autreDoc cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AutreDoc result = autreDocRepository.save(autreDoc);
        autreDocSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/autre-docs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /autre-docs} : Updates an existing autreDoc.
     *
     * @param autreDoc the autreDoc to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated autreDoc,
     * or with status {@code 400 (Bad Request)} if the autreDoc is not valid,
     * or with status {@code 500 (Internal Server Error)} if the autreDoc couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/autre-docs")
    public ResponseEntity<AutreDoc> updateAutreDoc(@RequestBody AutreDoc autreDoc) throws URISyntaxException {
        log.debug("REST request to update AutreDoc : {}", autreDoc);
        if (autreDoc.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        AutreDoc result = autreDocRepository.save(autreDoc);
        autreDocSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, autreDoc.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /autre-docs} : get all the autreDocs.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of autreDocs in body.
     */
    @GetMapping("/autre-docs")
    public List<AutreDoc> getAllAutreDocs() {
        log.debug("REST request to get all AutreDocs");
        return autreDocRepository.findAll();
    }

    /**
     * {@code GET  /autre-docs/:id} : get the "id" autreDoc.
     *
     * @param id the id of the autreDoc to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the autreDoc, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/autre-docs/{id}")
    public ResponseEntity<AutreDoc> getAutreDoc(@PathVariable Long id) {
        log.debug("REST request to get AutreDoc : {}", id);
        Optional<AutreDoc> autreDoc = autreDocRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(autreDoc);
    }

    /**
     * {@code DELETE  /autre-docs/:id} : delete the "id" autreDoc.
     *
     * @param id the id of the autreDoc to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/autre-docs/{id}")
    public ResponseEntity<Void> deleteAutreDoc(@PathVariable Long id) {
        log.debug("REST request to delete AutreDoc : {}", id);
        autreDocRepository.deleteById(id);
        autreDocSearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/autre-docs?query=:query} : search for the autreDoc corresponding
     * to the query.
     *
     * @param query the query of the autreDoc search.
     * @return the result of the search.
     */
    @GetMapping("/_search/autre-docs")
    public List<AutreDoc> searchAutreDocs(@RequestParam String query) {
        log.debug("REST request to search AutreDocs for query {}", query);
        return StreamSupport
            .stream(autreDocSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
