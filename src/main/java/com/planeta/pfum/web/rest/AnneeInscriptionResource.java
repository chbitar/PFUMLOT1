package com.planeta.pfum.web.rest;

import com.planeta.pfum.domain.AnneeInscription;
import com.planeta.pfum.repository.AnneeInscriptionRepository;
import com.planeta.pfum.repository.search.AnneeInscriptionSearchRepository;
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
 * REST controller for managing {@link com.planeta.pfum.domain.AnneeInscription}.
 */
@RestController
@RequestMapping("/api")
public class AnneeInscriptionResource {

    private final Logger log = LoggerFactory.getLogger(AnneeInscriptionResource.class);

    private static final String ENTITY_NAME = "anneeInscription";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AnneeInscriptionRepository anneeInscriptionRepository;

    private final AnneeInscriptionSearchRepository anneeInscriptionSearchRepository;

    public AnneeInscriptionResource(AnneeInscriptionRepository anneeInscriptionRepository, AnneeInscriptionSearchRepository anneeInscriptionSearchRepository) {
        this.anneeInscriptionRepository = anneeInscriptionRepository;
        this.anneeInscriptionSearchRepository = anneeInscriptionSearchRepository;
    }

    /**
     * {@code POST  /annee-inscriptions} : Create a new anneeInscription.
     *
     * @param anneeInscription the anneeInscription to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new anneeInscription, or with status {@code 400 (Bad Request)} if the anneeInscription has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/annee-inscriptions")
    public ResponseEntity<AnneeInscription> createAnneeInscription(@RequestBody AnneeInscription anneeInscription) throws URISyntaxException {
        log.debug("REST request to save AnneeInscription : {}", anneeInscription);
        if (anneeInscription.getId() != null) {
            throw new BadRequestAlertException("A new anneeInscription cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AnneeInscription result = anneeInscriptionRepository.save(anneeInscription);
        anneeInscriptionSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/annee-inscriptions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /annee-inscriptions} : Updates an existing anneeInscription.
     *
     * @param anneeInscription the anneeInscription to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated anneeInscription,
     * or with status {@code 400 (Bad Request)} if the anneeInscription is not valid,
     * or with status {@code 500 (Internal Server Error)} if the anneeInscription couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/annee-inscriptions")
    public ResponseEntity<AnneeInscription> updateAnneeInscription(@RequestBody AnneeInscription anneeInscription) throws URISyntaxException {
        log.debug("REST request to update AnneeInscription : {}", anneeInscription);
        if (anneeInscription.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        AnneeInscription result = anneeInscriptionRepository.save(anneeInscription);
        anneeInscriptionSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, anneeInscription.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /annee-inscriptions} : get all the anneeInscriptions.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of anneeInscriptions in body.
     */
    @GetMapping("/annee-inscriptions")
    public List<AnneeInscription> getAllAnneeInscriptions() {
        log.debug("REST request to get all AnneeInscriptions");
        return anneeInscriptionRepository.findAll();
    }

    /**
     * {@code GET  /annee-inscriptions/:id} : get the "id" anneeInscription.
     *
     * @param id the id of the anneeInscription to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the anneeInscription, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/annee-inscriptions/{id}")
    public ResponseEntity<AnneeInscription> getAnneeInscription(@PathVariable Long id) {
        log.debug("REST request to get AnneeInscription : {}", id);
        Optional<AnneeInscription> anneeInscription = anneeInscriptionRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(anneeInscription);
    }

    /**
     * {@code DELETE  /annee-inscriptions/:id} : delete the "id" anneeInscription.
     *
     * @param id the id of the anneeInscription to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/annee-inscriptions/{id}")
    public ResponseEntity<Void> deleteAnneeInscription(@PathVariable Long id) {
        log.debug("REST request to delete AnneeInscription : {}", id);
        anneeInscriptionRepository.deleteById(id);
        anneeInscriptionSearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/annee-inscriptions?query=:query} : search for the anneeInscription corresponding
     * to the query.
     *
     * @param query the query of the anneeInscription search.
     * @return the result of the search.
     */
    @GetMapping("/_search/annee-inscriptions")
    public List<AnneeInscription> searchAnneeInscriptions(@RequestParam String query) {
        log.debug("REST request to search AnneeInscriptions for query {}", query);
        return StreamSupport
            .stream(anneeInscriptionSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
