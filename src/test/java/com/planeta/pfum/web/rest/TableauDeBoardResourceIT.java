package com.planeta.pfum.web.rest;

import com.planeta.pfum.Pfumv10App;
import com.planeta.pfum.domain.TableauDeBoard;
import com.planeta.pfum.repository.TableauDeBoardRepository;
import com.planeta.pfum.repository.search.TableauDeBoardSearchRepository;
import com.planeta.pfum.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import static com.planeta.pfum.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@Link TableauDeBoardResource} REST controller.
 */
@SpringBootTest(classes = Pfumv10App.class)
public class TableauDeBoardResourceIT {

    private static final String DEFAULT_TABLEAU_DE_BOARD = "AAAAAAAAAA";
    private static final String UPDATED_TABLEAU_DE_BOARD = "BBBBBBBBBB";

    @Autowired
    private TableauDeBoardRepository tableauDeBoardRepository;

    @Mock
    private TableauDeBoardRepository tableauDeBoardRepositoryMock;

    /**
     * This repository is mocked in the com.planeta.pfum.repository.search test package.
     *
     * @see com.planeta.pfum.repository.search.TableauDeBoardSearchRepositoryMockConfiguration
     */
    @Autowired
    private TableauDeBoardSearchRepository mockTableauDeBoardSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restTableauDeBoardMockMvc;

    private TableauDeBoard tableauDeBoard;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TableauDeBoardResource tableauDeBoardResource = new TableauDeBoardResource(tableauDeBoardRepository, mockTableauDeBoardSearchRepository);
        this.restTableauDeBoardMockMvc = MockMvcBuilders.standaloneSetup(tableauDeBoardResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TableauDeBoard createEntity(EntityManager em) {
        TableauDeBoard tableauDeBoard = new TableauDeBoard()
            .tableauDeBoard(DEFAULT_TABLEAU_DE_BOARD);
        return tableauDeBoard;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TableauDeBoard createUpdatedEntity(EntityManager em) {
        TableauDeBoard tableauDeBoard = new TableauDeBoard()
            .tableauDeBoard(UPDATED_TABLEAU_DE_BOARD);
        return tableauDeBoard;
    }

    @BeforeEach
    public void initTest() {
        tableauDeBoard = createEntity(em);
    }

    @Test
    @Transactional
    public void createTableauDeBoard() throws Exception {
        int databaseSizeBeforeCreate = tableauDeBoardRepository.findAll().size();

        // Create the TableauDeBoard
        restTableauDeBoardMockMvc.perform(post("/api/tableau-de-boards")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tableauDeBoard)))
            .andExpect(status().isCreated());

        // Validate the TableauDeBoard in the database
        List<TableauDeBoard> tableauDeBoardList = tableauDeBoardRepository.findAll();
        assertThat(tableauDeBoardList).hasSize(databaseSizeBeforeCreate + 1);
        TableauDeBoard testTableauDeBoard = tableauDeBoardList.get(tableauDeBoardList.size() - 1);
        assertThat(testTableauDeBoard.getTableauDeBoard()).isEqualTo(DEFAULT_TABLEAU_DE_BOARD);

        // Validate the TableauDeBoard in Elasticsearch
        verify(mockTableauDeBoardSearchRepository, times(1)).save(testTableauDeBoard);
    }

    @Test
    @Transactional
    public void createTableauDeBoardWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tableauDeBoardRepository.findAll().size();

        // Create the TableauDeBoard with an existing ID
        tableauDeBoard.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTableauDeBoardMockMvc.perform(post("/api/tableau-de-boards")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tableauDeBoard)))
            .andExpect(status().isBadRequest());

        // Validate the TableauDeBoard in the database
        List<TableauDeBoard> tableauDeBoardList = tableauDeBoardRepository.findAll();
        assertThat(tableauDeBoardList).hasSize(databaseSizeBeforeCreate);

        // Validate the TableauDeBoard in Elasticsearch
        verify(mockTableauDeBoardSearchRepository, times(0)).save(tableauDeBoard);
    }


    @Test
    @Transactional
    public void getAllTableauDeBoards() throws Exception {
        // Initialize the database
        tableauDeBoardRepository.saveAndFlush(tableauDeBoard);

        // Get all the tableauDeBoardList
        restTableauDeBoardMockMvc.perform(get("/api/tableau-de-boards?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tableauDeBoard.getId().intValue())))
            .andExpect(jsonPath("$.[*].tableauDeBoard").value(hasItem(DEFAULT_TABLEAU_DE_BOARD.toString())));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllTableauDeBoardsWithEagerRelationshipsIsEnabled() throws Exception {
        TableauDeBoardResource tableauDeBoardResource = new TableauDeBoardResource(tableauDeBoardRepositoryMock, mockTableauDeBoardSearchRepository);
        when(tableauDeBoardRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restTableauDeBoardMockMvc = MockMvcBuilders.standaloneSetup(tableauDeBoardResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restTableauDeBoardMockMvc.perform(get("/api/tableau-de-boards?eagerload=true"))
        .andExpect(status().isOk());

        verify(tableauDeBoardRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllTableauDeBoardsWithEagerRelationshipsIsNotEnabled() throws Exception {
        TableauDeBoardResource tableauDeBoardResource = new TableauDeBoardResource(tableauDeBoardRepositoryMock, mockTableauDeBoardSearchRepository);
            when(tableauDeBoardRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restTableauDeBoardMockMvc = MockMvcBuilders.standaloneSetup(tableauDeBoardResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restTableauDeBoardMockMvc.perform(get("/api/tableau-de-boards?eagerload=true"))
        .andExpect(status().isOk());

            verify(tableauDeBoardRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getTableauDeBoard() throws Exception {
        // Initialize the database
        tableauDeBoardRepository.saveAndFlush(tableauDeBoard);

        // Get the tableauDeBoard
        restTableauDeBoardMockMvc.perform(get("/api/tableau-de-boards/{id}", tableauDeBoard.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(tableauDeBoard.getId().intValue()))
            .andExpect(jsonPath("$.tableauDeBoard").value(DEFAULT_TABLEAU_DE_BOARD.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTableauDeBoard() throws Exception {
        // Get the tableauDeBoard
        restTableauDeBoardMockMvc.perform(get("/api/tableau-de-boards/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTableauDeBoard() throws Exception {
        // Initialize the database
        tableauDeBoardRepository.saveAndFlush(tableauDeBoard);

        int databaseSizeBeforeUpdate = tableauDeBoardRepository.findAll().size();

        // Update the tableauDeBoard
        TableauDeBoard updatedTableauDeBoard = tableauDeBoardRepository.findById(tableauDeBoard.getId()).get();
        // Disconnect from session so that the updates on updatedTableauDeBoard are not directly saved in db
        em.detach(updatedTableauDeBoard);
        updatedTableauDeBoard
            .tableauDeBoard(UPDATED_TABLEAU_DE_BOARD);

        restTableauDeBoardMockMvc.perform(put("/api/tableau-de-boards")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTableauDeBoard)))
            .andExpect(status().isOk());

        // Validate the TableauDeBoard in the database
        List<TableauDeBoard> tableauDeBoardList = tableauDeBoardRepository.findAll();
        assertThat(tableauDeBoardList).hasSize(databaseSizeBeforeUpdate);
        TableauDeBoard testTableauDeBoard = tableauDeBoardList.get(tableauDeBoardList.size() - 1);
        assertThat(testTableauDeBoard.getTableauDeBoard()).isEqualTo(UPDATED_TABLEAU_DE_BOARD);

        // Validate the TableauDeBoard in Elasticsearch
        verify(mockTableauDeBoardSearchRepository, times(1)).save(testTableauDeBoard);
    }

    @Test
    @Transactional
    public void updateNonExistingTableauDeBoard() throws Exception {
        int databaseSizeBeforeUpdate = tableauDeBoardRepository.findAll().size();

        // Create the TableauDeBoard

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTableauDeBoardMockMvc.perform(put("/api/tableau-de-boards")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tableauDeBoard)))
            .andExpect(status().isBadRequest());

        // Validate the TableauDeBoard in the database
        List<TableauDeBoard> tableauDeBoardList = tableauDeBoardRepository.findAll();
        assertThat(tableauDeBoardList).hasSize(databaseSizeBeforeUpdate);

        // Validate the TableauDeBoard in Elasticsearch
        verify(mockTableauDeBoardSearchRepository, times(0)).save(tableauDeBoard);
    }

    @Test
    @Transactional
    public void deleteTableauDeBoard() throws Exception {
        // Initialize the database
        tableauDeBoardRepository.saveAndFlush(tableauDeBoard);

        int databaseSizeBeforeDelete = tableauDeBoardRepository.findAll().size();

        // Delete the tableauDeBoard
        restTableauDeBoardMockMvc.perform(delete("/api/tableau-de-boards/{id}", tableauDeBoard.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<TableauDeBoard> tableauDeBoardList = tableauDeBoardRepository.findAll();
        assertThat(tableauDeBoardList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the TableauDeBoard in Elasticsearch
        verify(mockTableauDeBoardSearchRepository, times(1)).deleteById(tableauDeBoard.getId());
    }

    @Test
    @Transactional
    public void searchTableauDeBoard() throws Exception {
        // Initialize the database
        tableauDeBoardRepository.saveAndFlush(tableauDeBoard);
        when(mockTableauDeBoardSearchRepository.search(queryStringQuery("id:" + tableauDeBoard.getId())))
            .thenReturn(Collections.singletonList(tableauDeBoard));
        // Search the tableauDeBoard
        restTableauDeBoardMockMvc.perform(get("/api/_search/tableau-de-boards?query=id:" + tableauDeBoard.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tableauDeBoard.getId().intValue())))
            .andExpect(jsonPath("$.[*].tableauDeBoard").value(hasItem(DEFAULT_TABLEAU_DE_BOARD)));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TableauDeBoard.class);
        TableauDeBoard tableauDeBoard1 = new TableauDeBoard();
        tableauDeBoard1.setId(1L);
        TableauDeBoard tableauDeBoard2 = new TableauDeBoard();
        tableauDeBoard2.setId(tableauDeBoard1.getId());
        assertThat(tableauDeBoard1).isEqualTo(tableauDeBoard2);
        tableauDeBoard2.setId(2L);
        assertThat(tableauDeBoard1).isNotEqualTo(tableauDeBoard2);
        tableauDeBoard1.setId(null);
        assertThat(tableauDeBoard1).isNotEqualTo(tableauDeBoard2);
    }
}
