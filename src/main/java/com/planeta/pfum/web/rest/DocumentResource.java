package com.planeta.pfum.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

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
import org.springframework.web.bind.annotation.RestController;

import com.planeta.pfum.domain.Document;
import com.planeta.pfum.domain.enumeration.TypeDocument;
import com.planeta.pfum.repository.DocumentRepository;
import com.planeta.pfum.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.planeta.pfum.domain.Document}.
 */
@RestController
@RequestMapping("/api")
public class DocumentResource {

	private final Logger log = LoggerFactory.getLogger(DocumentResource.class);

	private static final String ENTITY_NAME = "document";

	@Value("${jhipster.clientApp.name}")
	private String applicationName;

	private final DocumentRepository documentRepository;

	public DocumentResource(DocumentRepository documentRepository) {
		this.documentRepository = documentRepository;

	}

	/**
	 * {@code POST  /documents} : Create a new document.
	 *
	 * @param Document the Document to create.
	 * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with
	 *         body the new Document, or with status {@code 400 (Bad Request)} if
	 *         the document has already an ID.
	 * @throws URISyntaxException if the Location URI syntax is incorrect.
	 */
	@PostMapping("/documents")
	public ResponseEntity<Document> createDocument(@Valid @RequestBody Document Document) throws URISyntaxException {
		log.debug("REST request to save Document : {}", Document);
		if (Document.getId() != null) {
			throw new BadRequestAlertException("A new document cannot already have an ID", ENTITY_NAME, "idexists");
		}
		Document result = documentRepository.save(Document);
		return ResponseEntity
				.created(new URI("/api/documents/" + result.getId())).headers(HeaderUtil
						.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
				.body(result);
	}

	/**
	 * {@code PUT  /documents} : Updates an existing document.
	 *
	 * @param Document the Document to update.
	 * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body
	 *         the updated Document, or with status {@code 400 (Bad Request)} if the
	 *         Document is not valid, or with status
	 *         {@code 500 (Internal Server Error)} if the Document couldn't be
	 *         updated.
	 * @throws URISyntaxException if the Location URI syntax is incorrect.
	 */
	@PutMapping("/documents")
	public ResponseEntity<Document> updateDocument(@Valid @RequestBody Document Document) throws URISyntaxException {
		log.debug("REST request to update Document : {}", Document);
		if (Document.getId() == null) {
			throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
		}
		Document result = documentRepository.save(Document);
		return ResponseEntity.ok().headers(
				HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, Document.getId().toString()))
				.body(result);
	}

	/**
	 * {@code GET  /documents} : get all the documents.
	 *
	 * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list
	 *         of documents in body.
	 */
	@GetMapping("/documents")
	public List<Document> getAllDocuments() {
		log.debug("REST request to get all Documents");
		return documentRepository.findAll();
	}

	/**
	 * {@code GET  /documents/:id} : get the "id" document.
	 *
	 * @param id the id of the Document to retrieve.
	 * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body
	 *         the Document, or with status {@code 404 (Not Found)}.
	 */
	@GetMapping("/documents/{id}")
	public ResponseEntity<Document> getDocument(@PathVariable Long id) {
		log.debug("REST request to get Document : {}", id);
		Optional<Document> Document = documentRepository.findById(id);
		return ResponseUtil.wrapOrNotFound(Document);
	}

	/**
	 * {@code DELETE  /documents/:id} : delete the "id" document.
	 *
	 * @param id the id of the Document to delete.
	 * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
	 */
	@DeleteMapping("/documents/{id}")
	public ResponseEntity<Void> deleteDocument(@PathVariable Long id) {
		log.debug("REST request to delete Document : {}", id);
		documentRepository.deleteById(id);
		return ResponseEntity.noContent()
				.headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
				.build();
	}

	@GetMapping("/documents/typeDocument/{type}")
	public List<Document> getDocumetsByType(@PathVariable TypeDocument type) {
		log.debug("REST request to get Modules : {}", type);
		return documentRepository.findAllByTypeDocument(type);
	}

}
