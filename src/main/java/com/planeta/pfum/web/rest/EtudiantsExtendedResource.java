package com.planeta.pfum.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.text.DecimalFormat;
import java.util.Calendar;
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

import com.planeta.pfum.domain.EtudiantsExecutif;
import com.planeta.pfum.domain.EtudiantsLicence;
import com.planeta.pfum.domain.EtudiantsMaster;
import com.planeta.pfum.domain.Filiere;
import com.planeta.pfum.domain.Pays;
import com.planeta.pfum.domain.User;
import com.planeta.pfum.domain.enumeration.Niveau;
import com.planeta.pfum.repository.EtudiantsExecutifExtendedRepository;
import com.planeta.pfum.repository.EtudiantsLicenceExtendedRepository;
import com.planeta.pfum.repository.EtudiantsMasterExtendedRepository;
import com.planeta.pfum.repository.PaysRepository;
import com.planeta.pfum.repository.UserRepository;
import com.planeta.pfum.security.AuthoritiesConstants;
import com.planeta.pfum.security.SecurityUtils;
import com.planeta.pfum.service.MailService;
import com.planeta.pfum.service.UserExtendedService;
import com.planeta.pfum.web.rest.errors.BadRequestAlertException;
import com.planeta.pfum.web.rest.errors.EmailAlreadyUsedException;
import com.planeta.pfum.web.rest.errors.StudentAlreadySuscribedException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing
 * {@link com.planeta.pfum.domain.EtudiantsExecutif}.
 */
@RestController
@RequestMapping("/api")
public class EtudiantsExtendedResource {

	private final Logger log = LoggerFactory.getLogger(EtudiantsExtendedResource.class);

	private static final String ENTITY_NAME = "etudiantsExecutif";

	@Value("${jhipster.clientApp.name}")
	private String applicationName;

	private final EtudiantsExecutifExtendedRepository etudiantsExecutifRepository;

	private final EtudiantsLicenceExtendedRepository etudiantsLicenceRepository;

	private final EtudiantsMasterExtendedRepository etudiantsMasterRepository;

	private final UserExtendedService userService;

	private final UserRepository userRepository;

	private final MailService mailService;
	
	private final PaysRepository paysRepository;


	public EtudiantsExtendedResource(EtudiantsExecutifExtendedRepository etudiantsExecutifRepository,
			EtudiantsLicenceExtendedRepository etudiantsLicenceRepository,
			EtudiantsMasterExtendedRepository etudiantsMasterRepository, UserExtendedService userService,
			UserRepository userRepository, MailService mailService,PaysRepository paysRepository) {
		this.userService = userService;
		this.etudiantsExecutifRepository = etudiantsExecutifRepository;
		this.etudiantsLicenceRepository = etudiantsLicenceRepository;
		this.etudiantsMasterRepository = etudiantsMasterRepository;
		this.userRepository = userRepository;
		this.mailService = mailService;
		this.paysRepository = paysRepository;


	}

	/**
	 * {@code POST  /etudiants-executifs} : Create a new etudiantsExecutif.
	 *
	 * @param etudiantsExecutif the etudiantsExecutif to create.
	 * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with
	 *         body the new etudiantsExecutif, or with status
	 *         {@code 400 (Bad Request)} if the etudiantsExecutif has already an ID.
	 * @throws URISyntaxException if the Location URI syntax is incorrect.
	 */
	@PostMapping("/extended/etudiants-executifs")
	public ResponseEntity<EtudiantsExecutif> createEtudiantsExecutif(
			@Valid @RequestBody EtudiantsExecutif etudiantsExecutif) throws URISyntaxException {
		log.debug("REST request to save EtudiantsExecutif : {}", etudiantsExecutif);
		if (etudiantsExecutif.getId() != null) {
			throw new BadRequestAlertException("A new etudiantsExecutif cannot already have an ID", ENTITY_NAME,
					"idexists");
		}

		else if (userRepository.findOneByEmailIgnoreCase(etudiantsExecutif.getEmail()).isPresent()) {
			throw new EmailAlreadyUsedException();
		} else if (etudiantsExecutifRepository.findOneByCinPassIgnoreCase(etudiantsExecutif.getCinPass()).isPresent()) {
			throw new StudentAlreadySuscribedException();
		} else {

			EtudiantsExecutif result = etudiantsExecutifRepository.save(etudiantsExecutif);

			String suffixe = genererSuffix(result.getId());

			// Creation d'un compte USER pour se connecter
			User newUser = userService.createUserForActeur(etudiantsExecutif.getEmail(), etudiantsExecutif.getNom(),
					etudiantsExecutif.getPrenom(), AuthoritiesConstants.ETUDIANT_EXECUTIF);

			etudiantsExecutif.setUser(newUser);
			etudiantsExecutif.setSuffixe(suffixe);
			etudiantsExecutif.setNiveau(Niveau.PREMIER);
			etudiantsExecutifRepository.save(etudiantsExecutif);

			mailService.sendCreationEmail(newUser);

			return ResponseEntity
					.created(new URI("/api/etudiants-executifs/" + result.getId())).headers(HeaderUtil
							.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
					.body(result);
		}
	}

	@PostMapping("/extended/etudiants-licences")
	public ResponseEntity<EtudiantsLicence> createEtudiantsLicence(
			@Valid @RequestBody EtudiantsLicence etudiantsLicence) throws URISyntaxException {
		log.debug("REST request to save EtudiantsLicence : {}", etudiantsLicence);

		if (etudiantsLicence.getId() != null) {
			throw new BadRequestAlertException("A new etudiantsLicence cannot already have an ID", ENTITY_NAME,
					"idexists");
		} else if (userRepository.findOneByEmailIgnoreCase(etudiantsLicence.getEmail()).isPresent()) {
			throw new EmailAlreadyUsedException();
		} else if (etudiantsLicenceRepository.findOneByCinPassIgnoreCase(etudiantsLicence.getCinPass()).isPresent()) {
			throw new StudentAlreadySuscribedException();
		} else {

			EtudiantsLicence result = etudiantsLicenceRepository.save(etudiantsLicence);

			String suffixe = genererSuffix(result.getId());

			// Creation d'un compte USER pour se connecter
			User newUser = userService.createUserForActeur(etudiantsLicence.getEmail(), etudiantsLicence.getNom(),
					etudiantsLicence.getPrenom(), AuthoritiesConstants.ETUDIANT_LICENCE);

			etudiantsLicence.setUser(newUser);
			etudiantsLicence.setSuffixe(suffixe);
			etudiantsLicence.setNiveau(Niveau.PREMIER);
			etudiantsLicenceRepository.save(etudiantsLicence);

			mailService.sendCreationEmail(newUser);

			return ResponseEntity
					.created(new URI("/api/etudiants-licences/" + result.getId())).headers(HeaderUtil
							.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
					.body(result);
		}
	}

	/**
	 * {@code POST  /etudiants-masters} : Create a new etudiantsMaster.
	 *
	 * @param etudiantsMaster the etudiantsMaster to create.
	 * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with
	 *         body the new etudiantsMaster, or with status
	 *         {@code 400 (Bad Request)} if the etudiantsMaster has already an ID.
	 * @throws URISyntaxException if the Location URI syntax is incorrect.
	 */
	@PostMapping("/extended/etudiants-masters")
	public ResponseEntity<EtudiantsMaster> createEtudiantsMaster(@Valid @RequestBody EtudiantsMaster etudiantsMaster)
			throws URISyntaxException {
		log.debug("REST request to save EtudiantsMaster : {}", etudiantsMaster);
		if (etudiantsMaster.getId() != null) {
			throw new BadRequestAlertException("A new etudiantsMaster cannot already have an ID", ENTITY_NAME,
					"idexists");
		}

		else if (userRepository.findOneByEmailIgnoreCase(etudiantsMaster.getEmail()).isPresent()) {
			throw new EmailAlreadyUsedException();
		} else if (etudiantsMasterRepository.findOneByCinPassIgnoreCase(etudiantsMaster.getCinPass()).isPresent()) {
			throw new StudentAlreadySuscribedException();
		} else {
			EtudiantsMaster result = etudiantsMasterRepository.save(etudiantsMaster);

			String suffixe = genererSuffix(result.getId());

			// Creation d'un compte USER pour se connecter
			User newUser = userService.createUserForActeur(etudiantsMaster.getEmail(), etudiantsMaster.getNom(),
					etudiantsMaster.getPrenom(), AuthoritiesConstants.ETUDIANT_MASTER);
			etudiantsMaster.setUser(newUser);
			etudiantsMaster.setSuffixe(suffixe);
			etudiantsMaster.setNiveau(Niveau.PREMIER);
			etudiantsMasterRepository.save(etudiantsMaster);

			mailService.sendCreationEmail(newUser);

			return ResponseEntity
					.created(new URI("/api/etudiants-masters/" + result.getId())).headers(HeaderUtil
							.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
					.body(result);
		}
	}

	/**
	 * {@code GET  /etudiants-executifs} : get all the etudiantsExecutifs.
	 *
	 * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list
	 *         of etudiantsExecutifs in body.
	 */
	@GetMapping("/extended/etudiants-executifs")
	public List<EtudiantsExecutif> getAllEtudiantsExecutifs() {
		log.debug("REST request to get all EtudiantsExecutifs");

		if (SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.ETUDIANT_EXECUTIF)) {
			Optional<User> user = userRepository.findOneByLogin(SecurityUtils.getCurrentUserLogin().get());
			return etudiantsExecutifRepository.findAllByUserId(user.get().getId());
		}

		return etudiantsExecutifRepository.findAll();
	}

	@GetMapping("/extended/etudiants-executifs/filiere/{fil}")
	public List<EtudiantsExecutif> getAllEtudiantsExecutifsByFiliere(@PathVariable Filiere fil) {
		log.debug("REST request to get all etudiants-executifs");
		return etudiantsExecutifRepository.findAllByFiliere(fil);
	}

	/**
	 * {@code GET  /etudiants-licences} : get all the etudiantsLicences.
	 *
	 * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list
	 *         of etudiantsLicences in body.
	 */
	@GetMapping("/extended/etudiants-licences")
	public List<EtudiantsLicence> getAllEtudiantsLicences() {
		log.debug("REST request to get all EtudiantsLicences");

		if (SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.ETUDIANT_LICENCE)) {
			Optional<User> user = userRepository.findOneByLogin(SecurityUtils.getCurrentUserLogin().get());
			return etudiantsLicenceRepository.findAllByUserId(user.get().getId());
		}

		return etudiantsLicenceRepository.findAll();
	}

	@GetMapping("/extended/etudiants-licences/filiere/{fil}")
	public List<EtudiantsLicence> getAllEtudiantsLicencesByFiliere(@PathVariable Filiere fil) {
		log.debug("REST request to get all etudiants-licences");
		return etudiantsLicenceRepository.findAllByFiliere(fil);
	}

	@GetMapping("/extended/etudiants-masters/filiere/{fil}")
	public List<EtudiantsMaster> getAllEtudiantsMasterByFiliere(@PathVariable Filiere fil) {
		log.debug("REST request to get all etudiants-masters");
		return etudiantsMasterRepository.findAllByFiliere(fil);
	}

	@GetMapping("/extended/etudiants-licences/etudiant/{mot}")
	public List<EtudiantsLicence> getAllEtudiantsLicencesByNomOuPrenom(@PathVariable String mot) {
		log.debug("REST request to get all etudiants-licences");
		return etudiantsLicenceRepository
				.findBySuffixeContainingOrNomContainingIgnoreCaseOrPrenomContainingIgnoreCase(mot, mot, mot);
	}
	
	
	@GetMapping("/extended/etudiants-licences/niveau/{niveau}")
	public List<EtudiantsLicence> getAllEtudiantsLicencesByNiveau(@PathVariable Niveau niveau) {
		log.debug("REST request to get all etudiants-licences");
		return etudiantsLicenceRepository.findAllByNiveau(niveau);
	}
	
	@GetMapping("/extended/etudiants-masters/niveau/{niveau}")
	public List<EtudiantsMaster> getAllEtudiantsMasterByNiveau(@PathVariable Niveau niveau) {
		log.debug("REST request to get all etudiants-licences");
		return etudiantsMasterRepository.findAllByNiveau(niveau);
	}
	
	@GetMapping("/extended/etudiants-executifs/niveau/{niveau}")
	public List<EtudiantsExecutif> getAllEtudiantsExecutifByNiveau(@PathVariable Niveau niveau) {
		log.debug("REST request to get all etudiants-licences");
		return etudiantsExecutifRepository.findAllByNiveau(niveau);
	}


	@GetMapping("/extended/etudiants-masters/etudiant/{mot}")
	public List<EtudiantsMaster> getAllEtudiantsMastersByNomOuPrenom(@PathVariable String mot) {
		log.debug("REST request to get all etudiants-licences");
		return etudiantsMasterRepository
				.findBySuffixeContainingOrNomContainingIgnoreCaseOrPrenomContainingIgnoreCase(mot, mot, mot);

	}

	@GetMapping("/extended/etudiants-executifs/etudiant/{mot}")
	public List<EtudiantsExecutif> getAllEtudiantsExecutifsByNomOuPrenom(@PathVariable String mot) {
		log.debug("REST request to get all etudiants-licences");
		return etudiantsExecutifRepository
				.findBySuffixeContainingOrNomContainingIgnoreCaseOrPrenomContainingIgnoreCase(mot, mot, mot);

	}

	/**
	 * {@code GET  /etudiants-masters} : get all the etudiantsMasters.
	 *
	 * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list
	 *         of etudiantsMasters in body.
	 */
	@GetMapping("/extended/etudiants-masters")
	public List<EtudiantsMaster> getAllEtudiantsMasters() {
		log.debug("REST request to get all EtudiantsMasters");

		if (SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.ETUDIANT_MASTER)) {
			Optional<User> user = userRepository.findOneByLogin(SecurityUtils.getCurrentUserLogin().get());
			return etudiantsMasterRepository.findAllByUserId(user.get().getId());
		}

		return etudiantsMasterRepository.findAll();

	}
	@GetMapping("/extended/etudiants-executifs/espace")
	public ResponseEntity<EtudiantsExecutif> getEtudiantsExecutif() {
		Optional<User> user = userRepository.findOneByLogin(SecurityUtils.getCurrentUserLogin().get());
		Optional<EtudiantsExecutif> etudiantsExecutif = etudiantsExecutifRepository.findOneByUserId(user.get().getId());
		return ResponseUtil.wrapOrNotFound(etudiantsExecutif);
	}
	
	@GetMapping("/extended/etudiants-licences/espace")
	public ResponseEntity<EtudiantsLicence> getEtudiantsLicence() {
		Optional<User> user = userRepository.findOneByLogin(SecurityUtils.getCurrentUserLogin().get());
		Optional<EtudiantsLicence> etudiantsLicence = etudiantsLicenceRepository.findOneByUserId(user.get().getId());
		return ResponseUtil.wrapOrNotFound(etudiantsLicence);
	}
	
	@GetMapping("/pays")
	public List<Pays> getAllPays() {
		return  paysRepository.findAll();
	}
	
	@GetMapping("/extended/etudiants-masters/espace")
	public ResponseEntity<EtudiantsMaster> getEtudiantsMaster() {
		Optional<User> user = userRepository.findOneByLogin(SecurityUtils.getCurrentUserLogin().get());
		Optional<EtudiantsMaster> etudiantsMaster = etudiantsMasterRepository.findOneByUserId(user.get().getId());
		return ResponseUtil.wrapOrNotFound(etudiantsMaster);
	}
	private String genererSuffix(Long id) {
		int fourDigYear = Calendar.getInstance().get(Calendar.YEAR);

		String suffixe = "OS" + Integer.toString(fourDigYear).substring(2) + customFormat("0000", id);
		return suffixe;
	}

	private String customFormat(String pattern, long value) {
		DecimalFormat myFormatter = new DecimalFormat(pattern);
		return myFormatter.format(value);
	}

}
