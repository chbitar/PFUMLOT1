package com.planeta.pfum.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

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
import org.springframework.web.bind.annotation.RestController;

import com.planeta.pfum.domain.AutreDocument;
import com.planeta.pfum.repository.AutreDocumentRepository;
import com.planeta.pfum.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.planeta.pfum.domain.AutreDocument}.
 */
@RestController
@RequestMapping("/api")
public class AutreDocumentResource {

    private final Logger log = LoggerFactory.getLogger(AutreDocumentResource.class);

    private static final String ENTITY_NAME = "autreDocument";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AutreDocumentRepository autreDocumentRepository;

    public AutreDocumentResource(AutreDocumentRepository autreDocumentRepository) {
        this.autreDocumentRepository = autreDocumentRepository;
    }

    /**
     * {@code POST  /autre-documents} : Create a new autreDocument.
     *
     * @param autreDocument the autreDocument to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new autreDocument, or with status {@code 400 (Bad Request)} if the autreDocument has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/autre-documents")
    public ResponseEntity<AutreDocument> createAutreDocument(@RequestBody AutreDocument autreDocument) throws URISyntaxException {
        log.debug("REST request to save AutreDocument : {}", autreDocument);
        if (autreDocument.getId() != null) {
            throw new BadRequestAlertException("A new autreDocument cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AutreDocument result = autreDocumentRepository.save(autreDocument);
        return ResponseEntity.created(new URI("/api/autre-documents/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /autre-documents} : Updates an existing autreDocument.
     *
     * @param autreDocument the autreDocument to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated autreDocument,
     * or with status {@code 400 (Bad Request)} if the autreDocument is not valid,
     * or with status {@code 500 (Internal Server Error)} if the autreDocument couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/autre-documents")
    public ResponseEntity<AutreDocument> updateAutreDocument(@RequestBody AutreDocument autreDocument) throws URISyntaxException {
        log.debug("REST request to update AutreDocument : {}", autreDocument);
        if (autreDocument.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        AutreDocument result = autreDocumentRepository.save(autreDocument);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, autreDocument.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /autre-documents} : get all the autreDocuments.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of autreDocuments in body.
     */
    @GetMapping("/autre-documents")
    public List<AutreDocument> getAllAutreDocuments() {
        log.debug("REST request to get all AutreDocuments");
        return autreDocumentRepository.findAll();
    }

    /**
     * {@code GET  /autre-documents/:id} : get the "id" autreDocument.
     *
     * @param id the id of the autreDocument to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the autreDocument, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/autre-documents/{id}")
    public ResponseEntity<AutreDocument> getAutreDocument(@PathVariable Long id) {
        log.debug("REST request to get AutreDocument : {}", id);
        Optional<AutreDocument> autreDocument = autreDocumentRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(autreDocument);
    }

    /**
     * {@code DELETE  /autre-documents/:id} : delete the "id" autreDocument.
     *
     * @param id the id of the autreDocument to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/autre-documents/{id}")
    public ResponseEntity<Void> deleteAutreDocument(@PathVariable Long id) {
        log.debug("REST request to delete AutreDocument : {}", id);
        autreDocumentRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
