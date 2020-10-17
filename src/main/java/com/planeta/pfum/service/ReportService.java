package com.planeta.pfum.service;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

import javax.sql.DataSource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.ResourceUtils;

import com.planeta.pfum.domain.Filiere;
import com.planeta.pfum.domain.enumeration.Etablissement;
import com.planeta.pfum.domain.enumeration.Programme;
import com.planeta.pfum.report.SimpleReportExporter;
import com.planeta.pfum.repository.EtudiantsExecutifRepository;
import com.planeta.pfum.repository.EtudiantsLicenceRepository;
import com.planeta.pfum.repository.EtudiantsMasterRepository;
import com.planeta.pfum.repository.FiliereRepository;

import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.util.JRSaver;

@Service
@Transactional
public class ReportService {

	private final Logger log = LoggerFactory.getLogger(ReportService.class);

	private final EtudiantsExecutifRepository etudiantsExecutifRepository;

	private final EtudiantsMasterRepository etudiantsMasterRepository;

	private final EtudiantsLicenceRepository etudiantsLicenceRepository;

	private final FiliereRepository filiereRepository;
	
    private final ResourceLoader resourceLoader;


	@Autowired
	private DataSource dataSource;

	@Autowired
	private ApplicationEventPublisher applicationEventPublisher;

	private final Path fileStorageLocation;

	public ReportService(EtudiantsExecutifRepository etudiantsExecutifRepository, FiliereRepository filiereRepository,
			EtudiantsMasterRepository etudiantsMasterRepository, EtudiantsLicenceRepository etudiantsLicenceRepository, ResourceLoader resourceLoader)
			throws Exception {
		this.fileStorageLocation = Paths.get("Docs").toAbsolutePath().normalize();
		this.etudiantsExecutifRepository = etudiantsExecutifRepository;
		this.filiereRepository = filiereRepository;
		this.etudiantsMasterRepository = etudiantsMasterRepository;
		this.etudiantsLicenceRepository = etudiantsLicenceRepository;
		this.resourceLoader = resourceLoader;

		try {
			Files.createDirectories(this.fileStorageLocation);
		} catch (Exception ex) {
			throw new Exception("Could not create the directory where the uploaded files will be stored.", ex);
		}
	}

	/**
	 * Export orders
	 * 
	 * @param etudiantId
	 * 
	 * @param type
	 */
	@Transactional(readOnly = true)
	public Resource genererAttestationInscription(Integer etudiantId, String type, Programme programme) {
		try {

			Map<String, Object> parameters = new HashMap<>();
			parameters.put("EtudiantId", Long.valueOf(etudiantId));

			Filiere filiere = null;
			String fileName = "";
			File file = null;
			JasperReport jasperReport = null;
			JasperPrint jasperPrint;
			SimpleReportExporter simpleReportExporter = null;

			switch (programme) {
			case LICENCE:
				filiere = etudiantsLicenceRepository.getOne(Long.valueOf(etudiantId)).getFiliere();
//				file = ResourceUtils.getFile("classpath:INSCIRPTIONOSTELEAL.jrxml");
				 Resource resource = resourceLoader.getResource("classpath:INSCIRPTIONOSTELEAL.jrxml");
				 file = resource.getFile();
				
				
				jasperReport = JasperCompileManager.compileReport(file.getAbsolutePath());
				JRSaver.saveObject(jasperReport, "INSCIRPTIONOSTELEAL.jasper");

				parameters.put("FiliereId", filiere.getId());

				jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, dataSource.getConnection());
				simpleReportExporter = new SimpleReportExporter(jasperPrint);
				fileName = "attestationInscription-Licence.pdf";
				simpleReportExporter.exportToPdf(this.fileStorageLocation + "/" + fileName, "DHAVAL");
				break;
			case MASTER:
//				filiere = etudiantsMasterRepository.getOne(Long.valueOf(etudiantId)).getFiliere();
//				file = ResourceUtils.getFile("classpath:INSCIRPTIONOSTELEAM.jrxml");
				
				file = resourceLoader.getResource("classpath:INSCIRPTIONOSTELEAM.jrxml").getFile();
				
				
				jasperReport = JasperCompileManager.compileReport(file.getAbsolutePath());
				JRSaver.saveObject(jasperReport, "INSCIRPTIONOSTELEAM.jasper");

				parameters.put("FiliereId", filiere.getId());

				jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, dataSource.getConnection());
				simpleReportExporter = new SimpleReportExporter(jasperPrint);
				fileName = "attestationInscription-Master.pdf";
				simpleReportExporter.exportToPdf(this.fileStorageLocation + "/" + fileName, "DHAVAL");
				break;
			case MASTER_EXECUTIF:
				filiere = etudiantsExecutifRepository.getOne(Long.valueOf(etudiantId)).getFiliere();
//				file = ResourceUtils.getFile("classpath:INSCIRPTIONOSTELEAE.jrxml");
				file = resourceLoader.getResource("classpath:INSCIRPTIONOSTELEAE.jrxml").getFile();

				jasperReport = JasperCompileManager.compileReport(file.getAbsolutePath());
				JRSaver.saveObject(jasperReport, "INSCIRPTIONOSTELEAE.jasper");

				parameters.put("FiliereId", filiere.getId());

				jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, dataSource.getConnection());
				simpleReportExporter = new SimpleReportExporter(jasperPrint);
				fileName = "attestationInscription-Ececutif.pdf";
				simpleReportExporter.exportToPdf(this.fileStorageLocation + "/" + fileName, "DHAVAL");
				break;
			default:
				break;
			}

			return loadFileAsResource(fileName);
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (JRException e) {
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}

	@Transactional(readOnly = true)
	public Resource genererBadgeEtudiant(Integer etudiantId, String type, Programme programme) {
		try {

			Map<String, Object> parameters = new HashMap<>();
			parameters.put("EtudiantId", Long.valueOf(etudiantId));

			Filiere filiere = null;
			String fileName = "";
			File file = null;
			JasperReport jasperReport = null;
			JasperPrint jasperPrint;
			SimpleReportExporter simpleReportExporter = null;

			switch (programme) {
			case LICENCE:
				filiere = etudiantsLicenceRepository.getOne(Long.valueOf(etudiantId)).getFiliere();
				
				if(filiere.getEtablissement().getNomEcole().equals(Etablissement.ESLSCA.toString())) {
					file = ResourceUtils.getFile("classpath:BADGEESLSCALICENCE.jrxml");
					jasperReport = JasperCompileManager.compileReport(file.getAbsolutePath());
					JRSaver.saveObject(jasperReport, "BADGEESLSCALICENCE.jasper");

				}
				if(filiere.getEtablissement().getNomEcole().equals(Etablissement.OSTELEA.toString())) {
					file = ResourceUtils.getFile("classpath:BADGEOSTELEALICENCE.jrxml");
					jasperReport = JasperCompileManager.compileReport(file.getAbsolutePath());
					JRSaver.saveObject(jasperReport, "BADGEOSTELEALICENCE.jasper");
				}
			
				jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, dataSource.getConnection());
				simpleReportExporter = new SimpleReportExporter(jasperPrint);
				fileName = "badge-Licence.pdf";
				simpleReportExporter.exportToPdf(this.fileStorageLocation + "/" + fileName, "DHAVAL");
				break;
			case MASTER:
				
				
				filiere = etudiantsMasterRepository.getOne(Long.valueOf(etudiantId)).getFiliere();

				if(filiere.getEtablissement().getNomEcole().equals(Etablissement.ESLSCA.toString())) {
					file = ResourceUtils.getFile("classpath:BADGEESLSCAMASTER.jrxml");
					jasperReport = JasperCompileManager.compileReport(file.getAbsolutePath());
					JRSaver.saveObject(jasperReport, "BADGEESLSCALICENCE.jasper");

				}
				if(filiere.getEtablissement().getNomEcole().equals(Etablissement.OSTELEA.toString())) {
					file = ResourceUtils.getFile("classpath:BADGEOSTELEAMASTER.jrxml");
					jasperReport = JasperCompileManager.compileReport(file.getAbsolutePath());
					JRSaver.saveObject(jasperReport, "BADGEOSTELEALICENCE.jasper");
				}
				


				jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, dataSource.getConnection());
				simpleReportExporter = new SimpleReportExporter(jasperPrint);
				fileName = "badge-Master.pdf";
				simpleReportExporter.exportToPdf(this.fileStorageLocation + "/" + fileName, "DHAVAL");
				break;
			case MASTER_EXECUTIF:
				
				filiere = etudiantsExecutifRepository.getOne(Long.valueOf(etudiantId)).getFiliere();

				if(filiere.getEtablissement().getNomEcole().equals(Etablissement.ESLSCA.toString())) {
					file = ResourceUtils.getFile("classpath:BADGEESLSCAEXECUTIF.jrxml");
					jasperReport = JasperCompileManager.compileReport(file.getAbsolutePath());
					JRSaver.saveObject(jasperReport, "BADGEESLSCALICENCE.jasper");

				}
				if(filiere.getEtablissement().getNomEcole().equals(Etablissement.OSTELEA.toString())) {
					file = ResourceUtils.getFile("classpath:BADGEESLSCAEXECUTIF.jrxml");
					jasperReport = JasperCompileManager.compileReport(file.getAbsolutePath());
					JRSaver.saveObject(jasperReport, "BADGEOSTELEALICENCE.jasper");
				}
				
				
				JRSaver.saveObject(jasperReport, "BADGEESLSCALICENCE.jasper");


				jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, dataSource.getConnection());
				simpleReportExporter = new SimpleReportExporter(jasperPrint);
				fileName = "badge-Ececutif.pdf";
				simpleReportExporter.exportToPdf(this.fileStorageLocation + "/" + fileName, "DHAVAL");
				break;
			default:
				break;
			}

			return loadFileAsResource(fileName);
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (JRException e) {
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}

	/**
	 * Export orders
	 * 
	 * @param etudiantId
	 * 
	 * @param type
	 */
	@Transactional(readOnly = true)
	public Resource exportEtatInscriptionParFiliere(Integer filiereId, String type) {
		try {
			File file = ResourceUtils.getFile("classpath:etatInscFiliereEtudExecutif.jrxml");
			JasperReport jasperReport = JasperCompileManager.compileReport(file.getAbsolutePath());
			JRSaver.saveObject(jasperReport, ":etatInscFiliereEtudExecutif.jasper");
//			
			Map<String, Object> parameters = new HashMap<>();
			parameters.put("FiliereId", Long.valueOf(filiereId));
			parameters.put("FiliereNom", filiereRepository.getOne(Long.valueOf(filiereId)).getNomfiliere());

			JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters,
					dataSource.getConnection());

			SimpleReportExporter simpleReportExporter = new SimpleReportExporter(jasperPrint);
			String fileName = "";
			switch (type) {
			case "PDF":
			case "PRINT":
				fileName = "example.pdf";
//				JasperExportManager.exportReportToPdfFile(jasperPrint, this.fileStorageLocation + "/example.pdf");
				simpleReportExporter.exportToPdf(this.fileStorageLocation + "/" + fileName, "DHAVAL");
				break;
			case "XLSX":
				fileName = "Example.xlsx";
				simpleReportExporter.exportToXlsx(this.fileStorageLocation + "/" + fileName, "Example");
				break;
			case "CSV":
				fileName = "example.csv";
				simpleReportExporter.exportToCsv(this.fileStorageLocation + "/" + fileName);
				break;
			default:
				break;
			}

			return loadFileAsResource(fileName);
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (JRException e) {
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}

	private Resource loadFileAsResource(String fileName) throws IOException {
		try {
			Path filePath = this.fileStorageLocation.resolve(fileName).normalize();
			Resource resource = new UrlResource(filePath.toUri());
			if (resource.exists()) {
				return resource;
			} else {
				throw new FileNotFoundException("File not found " + fileName);
			}
		} catch (MalformedURLException ex) {
			throw new FileNotFoundException("File not found " + fileName);
		}
	}

}