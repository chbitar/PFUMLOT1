package com.planeta.pfum.web.rest;

import com.planeta.pfum.domain.Professeur;
import com.planeta.pfum.repository.ProfesseurRepository;
import com.planeta.pfum.repository.search.ProfesseurSearchRepository;
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
 * REST controller for managing {@link com.planeta.pfum.domain.Professeur}.
 */
@RestController
@RequestMapping("/api")
public class ProfesseurResource {

    private final Logger log = LoggerFactory.getLogger(ProfesseurResource.class);

    private static final String ENTITY_NAME = "professeur";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ProfesseurRepository professeurRepository;

    private final ProfesseurSearchRepository professeurSearchRepository;

    public ProfesseurResource(ProfesseurRepository professeurRepository, ProfesseurSearchRepository professeurSearchRepository) {
        this.professeurRepository = professeurRepository;
        this.professeurSearchRepository = professeurSearchRepository;
    }

    /**
     * {@code POST  /professeurs} : Create a new professeur.
     *
     * @param professeur the professeur to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new professeur, or with status {@code 400 (Bad Request)} if the professeur has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/professeurs")
    public ResponseEntity<Professeur> createProfesseur(@RequestBody Professeur professeur) throws URISyntaxException {
        log.debug("REST request to save Professeur : {}", professeur);
        if (professeur.getId() != null) {
            throw new BadRequestAlertException("A new professeur cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Professeur result = professeurRepository.save(professeur);
        professeurSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/professeurs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /professeurs} : Updates an existing professeur.
     *
     * @param professeur the professeur to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated professeur,
     * or with status {@code 400 (Bad Request)} if the professeur is not valid,
     * or with status {@code 500 (Internal Server Error)} if the professeur couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/professeurs")
    public ResponseEntity<Professeur> updateProfesseur(@RequestBody Professeur professeur) throws URISyntaxException {
        log.debug("REST request to update Professeur : {}", professeur);
        if (professeur.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Professeur result = professeurRepository.save(professeur);
        professeurSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, professeur.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /professeurs} : get all the professeurs.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of professeurs in body.
     */
    @GetMapping("/professeurs")
    public List<Professeur> getAllProfesseurs() {
        log.debug("REST request to get all Professeurs");
        return professeurRepository.findAll();
    }

    /**
     * {@code GET  /professeurs/:id} : get the "id" professeur.
     *
     * @param id the id of the professeur to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the professeur, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/professeurs/{id}")
    public ResponseEntity<Professeur> getProfesseur(@PathVariable Long id) {
        log.debug("REST request to get Professeur : {}", id);
        Optional<Professeur> professeur = professeurRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(professeur);
    }

    /**
     * {@code DELETE  /professeurs/:id} : delete the "id" professeur.
     *
     * @param id the id of the professeur to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/professeurs/{id}")
    public ResponseEntity<Void> deleteProfesseur(@PathVariable Long id) {
        log.debug("REST request to delete Professeur : {}", id);
        professeurRepository.deleteById(id);
        professeurSearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/professeurs?query=:query} : search for the professeur corresponding
     * to the query.
     *
     * @param query the query of the professeur search.
     * @return the result of the search.
     */
    @GetMapping("/_search/professeurs")
    public List<Professeur> searchProfesseurs(@RequestParam String query) {
        log.debug("REST request to search Professeurs for query {}", query);
        return StreamSupport
            .stream(professeurSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
