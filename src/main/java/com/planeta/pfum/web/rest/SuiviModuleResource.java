package com.planeta.pfum.web.rest;

import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.planeta.pfum.domain.AffectationModule;
import com.planeta.pfum.domain.Module;
import com.planeta.pfum.domain.Professeur;
import com.planeta.pfum.domain.SuiviModule;
import com.planeta.pfum.domain.User;
import com.planeta.pfum.domain.enumeration.Semestre;
import com.planeta.pfum.repository.AffectationModuleRepository;
import com.planeta.pfum.repository.ModuleRepository;
import com.planeta.pfum.repository.ProfesseurRepository;
import com.planeta.pfum.repository.SuiviModuleRepository;
import com.planeta.pfum.repository.UserRepository;
import com.planeta.pfum.repository.search.SuiviModuleSearchRepository;
import com.planeta.pfum.security.AuthoritiesConstants;
import com.planeta.pfum.security.SecurityUtils;
import com.planeta.pfum.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.planeta.pfum.domain.SuiviModule}.
 */
@RestController
@RequestMapping("/api")
public class SuiviModuleResource {

	private final Logger log = LoggerFactory.getLogger(SuiviModuleResource.class);

	private static final String ENTITY_NAME = "suiviModule";

	@Value("${jhipster.clientApp.name}")
	private String applicationName;

	private final SuiviModuleRepository suiviModuleRepository;

	private final SuiviModuleSearchRepository suiviModuleSearchRepository;

	private final ProfesseurRepository professeurRepository;

	private final UserRepository userRepository;

	private final AffectationModuleRepository affectationModuleRepository;
	private final ModuleRepository moduleRepository;

	public SuiviModuleResource(SuiviModuleRepository suiviModuleRepository,
			SuiviModuleSearchRepository suiviModuleSearchRepository, ProfesseurRepository professeurRepository,
			UserRepository userRepository, AffectationModuleRepository affectationModuleRepository,
			ModuleRepository moduleRepository) {
		this.suiviModuleRepository = suiviModuleRepository;
		this.suiviModuleSearchRepository = suiviModuleSearchRepository;
		this.professeurRepository = professeurRepository;
		this.userRepository = userRepository;
		this.affectationModuleRepository = affectationModuleRepository;
		this.moduleRepository = moduleRepository;
	}

	/**
	 * {@code POST  /suivi-modules} : Create a new suiviModule.
	 *
	 * @param suiviModule the suiviModule to create.
	 * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with
	 *         body the new suiviModule, or with status {@code 400 (Bad Request)} if
	 *         the suiviModule has already an ID.
	 * @throws URISyntaxException if the Location URI syntax is incorrect.
	 */
	@PostMapping("/suivi-modules")
	public ResponseEntity<SuiviModule> createSuiviModule(@Valid @RequestBody SuiviModule suiviModule)
			throws URISyntaxException {
		log.debug("REST request to save SuiviModule : {}", suiviModule);
		if (suiviModule.getId() != null) {
			throw new BadRequestAlertException("A new suiviModule cannot already have an ID", ENTITY_NAME, "idexists");
		}

		Optional<User> user = userRepository.findOneByLogin(SecurityUtils.getCurrentUserLogin().get());
		suiviModule.setUser(user.get());

		SuiviModule result = suiviModuleRepository.save(suiviModule);
		suiviModuleSearchRepository.save(result);
		return ResponseEntity
				.created(new URI("/api/suivi-modules/" + result.getId())).headers(HeaderUtil
						.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
				.body(result);
	}

	/**
	 * {@code PUT  /suivi-modules} : Updates an existing suiviModule.
	 *
	 * @param suiviModule the suiviModule to update.
	 * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body
	 *         the updated suiviModule, or with status {@code 400 (Bad Request)} if
	 *         the suiviModule is not valid, or with status
	 *         {@code 500 (Internal Server Error)} if the suiviModule couldn't be
	 *         updated.
	 * @throws URISyntaxException if the Location URI syntax is incorrect.
	 */
	@PutMapping("/suivi-modules")
	public ResponseEntity<SuiviModule> updateSuiviModule(@Valid @RequestBody SuiviModule suiviModule)
			throws URISyntaxException {
		log.debug("REST request to update SuiviModule : {}", suiviModule);
		if (suiviModule.getId() == null) {
			throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
		}
		SuiviModule result = suiviModuleRepository.save(suiviModule);
		suiviModuleSearchRepository.save(result);
		return ResponseEntity.ok().headers(
				HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, suiviModule.getId().toString()))
				.body(result);
	}

	/**
	 * {@code GET  /suivi-modules} : get all the suiviModules.
	 *
	 * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list
	 *         of suiviModules in body.
	 */
	@GetMapping("/suivi-modules")
	public List<SuiviModule> getAllSuiviModules() {
		log.debug("REST request to get all SuiviModules");
		return suiviModuleRepository.findAll();
	}

	/**
	 * {@code GET  /suivi-modules/:id} : get the "id" suiviModule.
	 *
	 * @param id the id of the suiviModule to retrieve.
	 * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body
	 *         the suiviModule, or with status {@code 404 (Not Found)}.
	 */
	@GetMapping("/suivi-modules/{id}")
	public ResponseEntity<SuiviModule> getSuiviModule(@PathVariable Long id) {
		log.debug("REST request to get SuiviModule : {}", id);
		Optional<SuiviModule> suiviModule = suiviModuleRepository.findById(id);
		return ResponseUtil.wrapOrNotFound(suiviModule);
	}

	/**
	 * {@code DELETE  /suivi-modules/:id} : delete the "id" suiviModule.
	 *
	 * @param id the id of the suiviModule to delete.
	 * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
	 */
	@DeleteMapping("/suivi-modules/{id}")
	public ResponseEntity<Void> deleteSuiviModule(@PathVariable Long id) {
		log.debug("REST request to delete SuiviModule : {}", id);
		suiviModuleRepository.deleteById(id);
		suiviModuleSearchRepository.deleteById(id);
		return ResponseEntity.noContent()
				.headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
				.build();
	}

	/**
	 * {@code SEARCH  /_search/suivi-modules?query=:query} : search for the
	 * suiviModule corresponding to the query.
	 *
	 * @param query the query of the suiviModule search.
	 * @return the result of the search.
	 */
	@GetMapping("/_search/suivi-modules")
	public List<SuiviModule> searchSuiviModules(@RequestParam String query) {
		log.debug("REST request to search SuiviModules for query {}", query);
		return StreamSupport.stream(suiviModuleSearchRepository.search(queryStringQuery(query)).spliterator(), false)
				.collect(Collectors.toList());
	}

	@GetMapping("/suivi-modules/professeur")
	public List<SuiviModule> getAllSuiviModulesAffectedToProfsseur() {
		log.debug("REST request to get all SuiviModules By professeurs");

		if (SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.ADMIN)) {
			return suiviModuleRepository.findAll();
		} else {
			Optional<User> user = userRepository.findOneByLogin(SecurityUtils.getCurrentUserLogin().get());
			Optional<Professeur> p = professeurRepository.findOneByUserId(user.get().getId());
			return suiviModuleRepository.findAllByUserId(user.get().getId());
		}

	}

	@GetMapping("/modules/professeur/{sem}")
	public List<com.planeta.pfum.domain.Module> getAllModulesAffectedToProfsseurBySem(@PathVariable Semestre sem) {
		log.debug("REST request to get all SuiviModules By professeurs");
		List<com.planeta.pfum.domain.Module> modules = new ArrayList<Module>();

		if (SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.ADMIN)) {
			for (Module m : moduleRepository.findAll()) {
				if (m.getSemestre() == sem) {
					modules.add(m);
				}
			}
		} else {
			Optional<User> user = userRepository.findOneByLogin(SecurityUtils.getCurrentUserLogin().get());
			Optional<Professeur> p = professeurRepository.findOneByUserId(user.get().getId());
			List<AffectationModule> afm = affectationModuleRepository.findAllWithModuleByProfesseurId(p.get().getId());
			for (AffectationModule a : afm) {
				if (a.getModule() != null && a.getModule().getSemestre() == sem) {
					modules.add(a.getModule());
				}
			}

		}

		return modules;
	}

	@GetMapping("/modules/professeur")
	public List<com.planeta.pfum.domain.Module> getAllModulesAffectedToProfesseur() {
		log.debug("REST request to get all SuiviModules By professeurs");
		List<com.planeta.pfum.domain.Module> modules = new ArrayList<Module>();

		if (SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.ADMIN)) {
			return moduleRepository.findAll();
		} else {
			Optional<User> user = userRepository.findOneByLogin(SecurityUtils.getCurrentUserLogin().get());
			Optional<Professeur> p = professeurRepository.findOneByUserId(user.get().getId());
			List<AffectationModule> afm = affectationModuleRepository.findAllWithModuleByProfesseurId(p.get().getId());
			for (AffectationModule a : afm) {
				modules.add(a.getModule());
			}

		}

		return modules;
	}

}
