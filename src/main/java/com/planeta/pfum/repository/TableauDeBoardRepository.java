package com.planeta.pfum.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.planeta.pfum.domain.TableauDeBoard;

/**
 * Spring Data  repository for the TableauDeBoard entity.
 */
@Repository
public interface TableauDeBoardRepository extends JpaRepository<TableauDeBoard, Long> {

    @Query(value = "select distinct tableauDeBoard from TableauDeBoard tableauDeBoard left join fetch tableauDeBoard.filiers left join fetch tableauDeBoard.calendriers",
        countQuery = "select count(distinct tableauDeBoard) from TableauDeBoard tableauDeBoard")
    Page<TableauDeBoard> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct tableauDeBoard from TableauDeBoard tableauDeBoard left join fetch tableauDeBoard.filiers left join fetch tableauDeBoard.calendriers")
    List<TableauDeBoard> findAllWithEagerRelationships();

    @Query("select tableauDeBoard from TableauDeBoard tableauDeBoard left join fetch tableauDeBoard.filiers left join fetch tableauDeBoard.calendriers where tableauDeBoard.id =:id")
    Optional<TableauDeBoard> findOneWithEagerRelationships(@Param("id") Long id);

}
