package com.planeta.pfum.web.rest;

import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.planeta.pfum.domain.User;
import com.planeta.pfum.domain.enumeration.Programme;
import com.planeta.pfum.repository.UserRepository;
import com.planeta.pfum.security.SecurityUtils;
import com.planeta.pfum.service.MailService;
import com.planeta.pfum.service.ReportService;
import com.planeta.pfum.service.dto.MessageEmail;

import io.github.jhipster.web.util.HeaderUtil;
import io.jsonwebtoken.io.IOException;

/**
 * REST controller for managing {@link com.aspire.blog.order.domain.Order}.
 */
@RestController
@RequestMapping("/api")
public class ReportResource {

	private final Logger log = LoggerFactory.getLogger(ReportResource.class);

	private static final String ENTITY_NAME = "report";

	@Value("${jhipster.clientApp.name}")
	private String applicationName;

	private final ReportService reportService;

	private final MailService mailService;

	private final UserRepository userRepository;

	public ReportResource(ReportService reportService, MailService mailService, UserRepository userRepository) {
		this.reportService = reportService;
		this.mailService = mailService;
		this.userRepository = userRepository;

	}

	/**
	 * {@code GET  /orders} : get all the orders.
	 *
	 * 
	 * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list
	 *         of orders in body.
	 * @throws java.io.IOException
	 */
	@GetMapping("/attestation/{etudiantId}/{type}/{programme}")
	public ResponseEntity<Resource> genererAttestationInscription(@PathVariable Integer etudiantId,
			@PathVariable String type, @PathVariable Programme programme, HttpServletRequest request)
			throws IOException, java.io.IOException {
		log.debug("REST request to export all Orders");
		// Load file as Resource
		Resource resource = reportService.genererAttestationInscription(etudiantId, type, programme);
		// Try to determine file's content type
		String contentType = null;
		try {
			contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
		} catch (IOException ex) {
			log.info("Could not determine file type.");
		}

		// Fallback to the default content type if type could not be determined
		if (contentType == null) {
			contentType = "application/octet-stream";
		}

		return ResponseEntity.ok().contentType(MediaType.parseMediaType(contentType))
				.contentLength(resource.getFile().length())
				.header(HttpHeaders.CONTENT_DISPOSITION, "attachment;filename=" + resource.getFilename())
				.headers(HeaderUtil.createAlert(applicationName, "Orders exported successfully", resource.toString()))
				.body(resource);
	}

	@GetMapping("/badge/etudiant/{etudiantId}/{type}/{programme}")
	public ResponseEntity<Resource> genererBadge(@PathVariable Integer etudiantId, @PathVariable String type,
			@PathVariable Programme programme, HttpServletRequest request) throws IOException, java.io.IOException {
		log.debug("REST request to export all Orders");
		// Load file as Resource
		Resource resource = reportService.genererBadgeEtudiant(etudiantId, type, programme);
		// Try to determine file's content type
		String contentType = null;
		try {
			contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
		} catch (IOException ex) {
			log.info("Could not determine file type.");
		}

		// Fallback to the default content type if type could not be determined
		if (contentType == null) {
			contentType = "application/octet-stream";
		}

		return ResponseEntity.ok().contentType(MediaType.parseMediaType(contentType))
				.contentLength(resource.getFile().length())
				.header(HttpHeaders.CONTENT_DISPOSITION, "attachment;filename=" + resource.getFilename())
				.headers(HeaderUtil.createAlert(applicationName, "Orders exported successfully", resource.toString()))
				.body(resource);
	}

	@GetMapping("/etatInscrition/{filiereId}/{type}")
	public ResponseEntity<Resource> exportEtatInscriptionParFiliere(@PathVariable Integer filiereId,
			@PathVariable String type, HttpServletRequest request) throws IOException, java.io.IOException {
		log.debug("REST request to export all Orders");
		// Load file as Resource
		Resource resource = reportService.exportEtatInscriptionParFiliere(filiereId, type);
		String contentType = null;
		try {
			contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
		} catch (IOException ex) {
			log.info("Could not determine file type.");
		}

		// Fallback to the default content type if type could not be determined
		if (contentType == null) {
			contentType = "application/octet-stream";
		}

		return ResponseEntity.ok().contentType(MediaType.parseMediaType(contentType))
				.contentLength(resource.getFile().length())
				.header(HttpHeaders.CONTENT_DISPOSITION, "attachment;filename=" + resource.getFilename())
				.headers(HeaderUtil.createAlert(applicationName, "Orders exported successfully", resource.toString()))
				.body(resource);
	}

	@PostMapping("/etudiants/envoyer-email")
	@ResponseStatus(HttpStatus.CREATED)
	public void envoyerDemandeEtudiant(@RequestBody MessageEmail message) {
		Optional<User> user = userRepository.findOneByLogin(SecurityUtils.getCurrentUserLogin().get());

		mailService.envoyerDemandeEtudiant(user.get(), message.getSujet(), message.getCorps());

	}

}