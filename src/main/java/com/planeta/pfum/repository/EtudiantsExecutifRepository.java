package com.planeta.pfum.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.planeta.pfum.domain.EtudiantsExecutif;

/**
 * Spring Data repository for the EtudiantsExecutif entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EtudiantsExecutifRepository extends JpaRepository<EtudiantsExecutif, Long> {

}
