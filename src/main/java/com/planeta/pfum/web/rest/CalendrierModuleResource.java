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

import com.planeta.pfum.domain.CalendrierModule;
import com.planeta.pfum.domain.Document;
import com.planeta.pfum.domain.FicheAbsence;
import com.planeta.pfum.domain.User;
import com.planeta.pfum.domain.enumeration.Programme;
import com.planeta.pfum.domain.enumeration.TypeDocument;
import com.planeta.pfum.repository.CalendrierModuleRepository;
import com.planeta.pfum.security.AuthoritiesConstants;
import com.planeta.pfum.security.SecurityUtils;
import com.planeta.pfum.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing
 * {@link com.planeta.pfum.domain.CalendrierModule}.
 */
@RestController
@RequestMapping("/api")
public class CalendrierModuleResource {

	private final Logger log = LoggerFactory.getLogger(CalendrierModuleResource.class);

	private static final String ENTITY_NAME = "calendrierModule";

	@Value("${jhipster.clientApp.name}")
	private String applicationName;

	private final CalendrierModuleRepository calendrierModuleRepository;

	public CalendrierModuleResource(CalendrierModuleRepository calendrierModuleRepository) {
		this.calendrierModuleRepository = calendrierModuleRepository;
	}

	/**
	 * {@code POST  /calendrier-modules} : Create a new calendrierModule.
	 *
	 * @param calendrierModule the calendrierModule to create.
	 * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with
	 *         body the new calendrierModule, or with status
	 *         {@code 400 (Bad Request)} if the calendrierModule has already an ID.
	 * @throws URISyntaxException if the Location URI syntax is incorrect.
	 */
	@PostMapping("/calendrier-modules")
	public ResponseEntity<CalendrierModule> createCalendrierModule(@RequestBody CalendrierModule calendrierModule)
			throws URISyntaxException {
		log.debug("REST request to save CalendrierModule : {}", calendrierModule);
		if (calendrierModule.getId() != null) {
			throw new BadRequestAlertException("A new calendrierModule cannot already have an ID", ENTITY_NAME,
					"idexists");
		}
		CalendrierModule result = calendrierModuleRepository.save(calendrierModule);
		return ResponseEntity
				.created(new URI("/api/calendrier-modules/" + result.getId())).headers(HeaderUtil
						.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
				.body(result);
	}

	/**
	 * {@code PUT  /calendrier-modules} : Updates an existing calendrierModule.
	 *
	 * @param calendrierModule the calendrierModule to update.
	 * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body
	 *         the updated calendrierModule, or with status
	 *         {@code 400 (Bad Request)} if the calendrierModule is not valid, or
	 *         with status {@code 500 (Internal Server Error)} if the
	 *         calendrierModule couldn't be updated.
	 * @throws URISyntaxException if the Location URI syntax is incorrect.
	 */
	@PutMapping("/calendrier-modules")
	public ResponseEntity<CalendrierModule> updateCalendrierModule(@RequestBody CalendrierModule calendrierModule)
			throws URISyntaxException {
		log.debug("REST request to update CalendrierModule : {}", calendrierModule);
		if (calendrierModule.getId() == null) {
			throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
		}
		CalendrierModule result = calendrierModuleRepository.save(calendrierModule);
		return ResponseEntity.ok().headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME,
				calendrierModule.getId().toString())).body(result);
	}

	/**
	 * {@code GET  /calendrier-modules} : get all the calendrierModules.
	 *
	 * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list
	 *         of calendrierModules in body.
	 */
	@GetMapping("/calendrier-modules")
	public List<CalendrierModule> getAllCalendrierModules() {
		log.debug("REST request to get all CalendrierModules");
		return calendrierModuleRepository.findAll();
	}

	/**
	 * {@code GET  /calendrier-modules/:id} : get the "id" calendrierModule.
	 *
	 * @param id the id of the calendrierModule to retrieve.
	 * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body
	 *         the calendrierModule, or with status {@code 404 (Not Found)}.
	 */
	@GetMapping("/calendrier-modules/{id}")
	public ResponseEntity<CalendrierModule> getCalendrierModule(@PathVariable Long id) {
		log.debug("REST request to get CalendrierModule : {}", id);
		Optional<CalendrierModule> calendrierModule = calendrierModuleRepository.findById(id);
		return ResponseUtil.wrapOrNotFound(calendrierModule);
	}
	

	/**
	 * {@code DELETE  /calendrier-modules/:id} : delete the "id" calendrierModule.
	 *
	 * @param id the id of the calendrierModule to delete.
	 * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
	 */
	@DeleteMapping("/calendrier-modules/{id}")
	public ResponseEntity<Void> deleteCalendrierModule(@PathVariable Long id) {
		log.debug("REST request to delete CalendrierModule : {}", id);
		calendrierModuleRepository.deleteById(id);
		return ResponseEntity.noContent()
				.headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
				.build();
	}

	@GetMapping("/calendrier-modules/programme/{programme}")
	public List<CalendrierModule> getCalendrierModuleByType(@PathVariable Programme programme) {
		log.debug("REST request to get Modules : {}", programme);
		return calendrierModuleRepository.findAllByProgramme(programme);
	}

	@GetMapping("/calendrier-modules/module/{module}")
	public List<CalendrierModule> getAllFicheAbsencesByModule(@PathVariable String module) {
		return calendrierModuleRepository.findAllByModuleId(Long.valueOf(module));
	}

}
