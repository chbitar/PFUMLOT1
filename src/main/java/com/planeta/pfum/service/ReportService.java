package com.planeta.pfum.service;


import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.sql.DataSource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.ResourceUtils;

import com.planeta.pfum.domain.EtudiantsExecutif;
import com.planeta.pfum.report.SimpleReportExporter;
import com.planeta.pfum.repository.EtudiantsExecutifRepository;
import com.planeta.pfum.repository.FiliereRepository;

import net.sf.jasperreports.engine.JRDataSource;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import net.sf.jasperreports.engine.util.JRSaver;

/**
 * Service Implementation for managing {@link Order}.
 */
@Service
@Transactional
public class ReportService  {

	private final Logger log = LoggerFactory.getLogger(ReportService.class);

	private final EtudiantsExecutifRepository etudiantsExecutifRepository;
	
	private final FiliereRepository filiereRepository;

    
	@Autowired
    private DataSource dataSource;

	@Autowired
	private ApplicationEventPublisher applicationEventPublisher;


	private final Path fileStorageLocation;


	public ReportService(EtudiantsExecutifRepository etudiantsExecutifRepository,FiliereRepository filiereRepository) throws Exception {
		this.fileStorageLocation = Paths.get("../Docs").toAbsolutePath().normalize();
		this.etudiantsExecutifRepository = etudiantsExecutifRepository;
		this.filiereRepository = filiereRepository;
		
		try {
			Files.createDirectories(this.fileStorageLocation);
		} catch (Exception ex) {
			throw new Exception("Could not create the directory where the uploaded files will be stored.", ex);
		}
	}


	/**
	 * Export orders
	 * @param etudiantId 
	 * 
	 * @param type
	 */
	@Transactional(readOnly = true)
	public Resource exportAll(Integer etudiantId, String type ) {
		try {
			File file = ResourceUtils.getFile("classpath:attestationScolarite.jrxml");
			JasperReport jasperReport = JasperCompileManager.compileReport(file.getAbsolutePath());
			JRSaver.saveObject(jasperReport, "attestationScolarite.jasper");
//			 java.util.List<EtudiantsExecutif> nodeList = new ArrayList<EtudiantsExecutif>();
//			    nodeList.add(etudiantsExecutifRepository.getOne(1l));
//			exampleReport.jrxml
			
			Map<String, Object> parameters = new HashMap<>();
			parameters.put("EtudiantId",Long.valueOf(etudiantId));
			parameters.put("FiliereId", etudiantsExecutifRepository.getOne(Long.valueOf(etudiantId)).getFiliere().getId());

			JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, dataSource.getConnection());

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

	
	/**
	 * Export orders
	 * @param etudiantId 
	 * 
	 * @param type
	 */
	@Transactional(readOnly = true)
	public Resource exportEtatInscriptionParFiliere(Integer filiereId, String type ) {
		try {
			File file = ResourceUtils.getFile("classpath:etatInscFiliereEtudExecutif.jrxml");
			JasperReport jasperReport = JasperCompileManager.compileReport(file.getAbsolutePath());
			JRSaver.saveObject(jasperReport, ":etatInscFiliereEtudExecutif.jasper");
//			
			Map<String, Object> parameters = new HashMap<>();
			parameters.put("FiliereId",Long.valueOf(filiereId));
			parameters.put("FiliereNom",filiereRepository.getOne(Long.valueOf(filiereId)).getNomfiliere());
			
			JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, dataSource.getConnection());

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