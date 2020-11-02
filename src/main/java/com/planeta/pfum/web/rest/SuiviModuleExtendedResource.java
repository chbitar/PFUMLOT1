package com.planeta.pfum.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.planeta.pfum.domain.AffectationModule;
import com.planeta.pfum.domain.Module;
import com.planeta.pfum.domain.Professeur;
import com.planeta.pfum.domain.SuiviModule;
import com.planeta.pfum.domain.User;
import com.planeta.pfum.domain.enumeration.Semestre;
import com.planeta.pfum.repository.AffectationModuleExtendedRepository;
import com.planeta.pfum.repository.ModuleRepository;
import com.planeta.pfum.repository.ProfesseurExtendedRepository;
import com.planeta.pfum.repository.SuiviModuleExtendedRepository;
import com.planeta.pfum.repository.UserRepository;
import com.planeta.pfum.security.AuthoritiesConstants;
import com.planeta.pfum.security.SecurityUtils;
import com.planeta.pfum.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;

/**
 * REST controller for managing {@link com.planeta.pfum.domain.SuiviModule}.
 */
@RestController
@RequestMapping("/api")
public class SuiviModuleExtendedResource {

	private final Logger log = LoggerFactory.getLogger(SuiviModuleResource.class);

	private static final String ENTITY_NAME = "suiviModule";

	@Value("${jhipster.clientApp.name}")
	private String applicationName;

	private final SuiviModuleExtendedRepository suiviModuleRepository;

	private final ProfesseurExtendedRepository professeurRepository;

	private final UserRepository userRepository;

	private final AffectationModuleExtendedRepository affectationModuleRepository;

	private final ModuleRepository moduleRepository;

	public SuiviModuleExtendedResource(SuiviModuleExtendedRepository suiviModuleRepository,
			ProfesseurExtendedRepository professeurRepository, UserRepository userRepository,
			AffectationModuleExtendedRepository affectationModuleRepository, ModuleRepository moduleRepository) {
		this.suiviModuleRepository = suiviModuleRepository;
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
	@PostMapping("/extended/suivi-modules")
	public ResponseEntity<SuiviModule> createSuiviModule(@Valid @RequestBody SuiviModule suiviModule)
			throws URISyntaxException {
		log.debug("REST request to save SuiviModule : {}", suiviModule);
		if (suiviModule.getId() != null) {
			throw new BadRequestAlertException("A new suiviModule cannot already have an ID", ENTITY_NAME, "idexists");
		}

		Optional<User> user = userRepository.findOneByLogin(SecurityUtils.getCurrentUserLogin().get());
		suiviModule.setUser(user.get());

		SuiviModule result = suiviModuleRepository.save(suiviModule);
		return ResponseEntity
				.created(new URI("/api/extended/suivi-modules/" + result.getId())).headers(HeaderUtil
						.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
				.body(result);
	}

	@GetMapping("/extended/suivi-modules")
	public List<SuiviModule> getAllSuiviModulesAffectedToProfsseur() {
		log.debug("REST request to get all SuiviModules By professeurs");

		if (SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.ADMIN)) {
			return suiviModuleRepository.findAll();
		} else {
			Optional<User> user = userRepository.findOneByLogin(SecurityUtils.getCurrentUserLogin().get());
			return suiviModuleRepository.findAllByUserId(user.get().getId());
		}

	}

	@GetMapping("/extended/modules/professeur/{sem}")
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

	@GetMapping("/extended/modules/professeur")
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

	@GetMapping("/extended/suivi-modules/module/{module}")
	public List<SuiviModule> getAllSuiviModuleByModule(@PathVariable String module) {
		log.debug("REST request to get all FicheAbsences");

		if (SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.ADMIN)) {
			return suiviModuleRepository.findAllByModuleId(Long.valueOf(module));
		} else {
			Optional<User> user = userRepository.findOneByLogin(SecurityUtils.getCurrentUserLogin().get());
			return suiviModuleRepository.findAllByUserIdAndModuleId(user.get().getId(), Long.valueOf(module));
		}

	}

}
