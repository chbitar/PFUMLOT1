package com.planeta.pfum.service;

import com.planeta.pfum.domain.Document;
import com.planeta.pfum.domain.Module;
import com.planeta.pfum.domain.enumeration.TypeDocument;
import com.planeta.pfum.repository.DocumentRepository;
import com.planeta.pfum.repository.search.DocumentSearchRepository;
import com.planeta.pfum.service.dto.DocumentDTO;
import com.planeta.pfum.service.mapper.DocumentMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing {@link Document}.
 */
@Service
@Transactional
public class DocumentService {

    private final Logger log = LoggerFactory.getLogger(DocumentService.class);

    private final DocumentRepository documentRepository;

    private final DocumentMapper documentMapper;

    private final DocumentSearchRepository documentSearchRepository;

    public DocumentService(DocumentRepository documentRepository, DocumentMapper documentMapper, DocumentSearchRepository documentSearchRepository) {
        this.documentRepository = documentRepository;
        this.documentMapper = documentMapper;
        this.documentSearchRepository = documentSearchRepository;
    }

    /**
     * Save a document.
     *
     * @param documentDTO the entity to save.
     * @return the persisted entity.
     */
    public DocumentDTO save(DocumentDTO documentDTO) {
        log.debug("Request to save Document : {}", documentDTO);
        Document document = documentMapper.toEntity(documentDTO);
        document = documentRepository.save(document);
        DocumentDTO result = documentMapper.toDto(document);
//        documentSearchRepository.save(document);
        return result;
    }

    /**
     * Get all the documents.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<DocumentDTO> findAll() {
        log.debug("Request to get all Documents");
        return documentRepository.findAll().stream()
            .map(documentMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one document by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<DocumentDTO> findOne(Long id) {
        log.debug("Request to get Document : {}", id);
        return documentRepository.findById(id)
            .map(documentMapper::toDto);
    }

    /**
     * Delete the document by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Document : {}", id);
        documentRepository.deleteById(id);
//        documentSearchRepository.deleteById(id);
    }

    /**
     * Search for the document corresponding to the query.
     *
     * @param query the query of the search.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<DocumentDTO> search(String query) {
        log.debug("Request to search Documents for query {}", query);
//        return StreamSupport
//            .stream(documentSearchRepository.search(queryStringQuery(query)).spliterator(), false)
//            .map(documentMapper::toDto)
//            .collect(Collectors.toList());
        
       return new ArrayList<DocumentDTO>(); 
    }

	public List<Module> findAllByTypeDocument(TypeDocument sem) {
		// TODO Auto-generated method stub
		return null;
	}
}
