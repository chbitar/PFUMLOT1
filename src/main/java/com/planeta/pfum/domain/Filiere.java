package com.planeta.pfum.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import com.planeta.pfum.domain.enumeration.Programme;

/**
 * A Filiere.
 */
@Entity
@Table(name = "filiere")
@org.springframework.data.elasticsearch.annotations.Document(indexName = "filiere")
public class Filiere implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @org.springframework.data.elasticsearch.annotations.Field(type = FieldType.Keyword)
    private Long id;

    @Column(name = "nomfiliere")
    private String nomfiliere;

    @Column(name = "responsable")
    private String responsable;

    @Column(name = "accreditaion")
    private String accreditaion;

    @Enumerated(EnumType.STRING)
    @Column(name = "programme")
    private Programme programme;

    @OneToMany(mappedBy = "filiere")
    private Set<EtudiantsExecutif> etudiantsExecutifs = new HashSet<>();

    @OneToMany(mappedBy = "filiere")
    private Set<EtudiantsLicence> etudiantsLicences = new HashSet<>();

    @OneToMany(mappedBy = "filiere")
    private Set<EtudiantsMaster> etudiantsMasters = new HashSet<>();

    @OneToMany(mappedBy = "filiere")
    private Set<Module> modules = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("filieres")
    private Etablissement etablissement;

    @ManyToMany(mappedBy = "filiers")
    @JsonIgnore
    private Set<TableauDeBoard> boards = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNomfiliere() {
        return nomfiliere;
    }

    public Filiere nomfiliere(String nomfiliere) {
        this.nomfiliere = nomfiliere;
        return this;
    }

    public void setNomfiliere(String nomfiliere) {
        this.nomfiliere = nomfiliere;
    }

    public String getResponsable() {
        return responsable;
    }

    public Filiere responsable(String responsable) {
        this.responsable = responsable;
        return this;
    }

    public void setResponsable(String responsable) {
        this.responsable = responsable;
    }

    public String getAccreditaion() {
        return accreditaion;
    }

    public Filiere accreditaion(String accreditaion) {
        this.accreditaion = accreditaion;
        return this;
    }

    public void setAccreditaion(String accreditaion) {
        this.accreditaion = accreditaion;
    }

    public Programme getProgramme() {
        return programme;
    }

    public Filiere programme(Programme programme) {
        this.programme = programme;
        return this;
    }

    public void setProgramme(Programme programme) {
        this.programme = programme;
    }

    public Set<EtudiantsExecutif> getEtudiantsExecutifs() {
        return etudiantsExecutifs;
    }

    public Filiere etudiantsExecutifs(Set<EtudiantsExecutif> etudiantsExecutifs) {
        this.etudiantsExecutifs = etudiantsExecutifs;
        return this;
    }

    public Filiere addEtudiantsExecutif(EtudiantsExecutif etudiantsExecutif) {
        this.etudiantsExecutifs.add(etudiantsExecutif);
        etudiantsExecutif.setFiliere(this);
        return this;
    }

    public Filiere removeEtudiantsExecutif(EtudiantsExecutif etudiantsExecutif) {
        this.etudiantsExecutifs.remove(etudiantsExecutif);
        etudiantsExecutif.setFiliere(null);
        return this;
    }

    public void setEtudiantsExecutifs(Set<EtudiantsExecutif> etudiantsExecutifs) {
        this.etudiantsExecutifs = etudiantsExecutifs;
    }

    public Set<EtudiantsLicence> getEtudiantsLicences() {
        return etudiantsLicences;
    }

    public Filiere etudiantsLicences(Set<EtudiantsLicence> etudiantsLicences) {
        this.etudiantsLicences = etudiantsLicences;
        return this;
    }

    public Filiere addEtudiantsLicence(EtudiantsLicence etudiantsLicence) {
        this.etudiantsLicences.add(etudiantsLicence);
        etudiantsLicence.setFiliere(this);
        return this;
    }

    public Filiere removeEtudiantsLicence(EtudiantsLicence etudiantsLicence) {
        this.etudiantsLicences.remove(etudiantsLicence);
        etudiantsLicence.setFiliere(null);
        return this;
    }

    public void setEtudiantsLicences(Set<EtudiantsLicence> etudiantsLicences) {
        this.etudiantsLicences = etudiantsLicences;
    }

    public Set<EtudiantsMaster> getEtudiantsMasters() {
        return etudiantsMasters;
    }

    public Filiere etudiantsMasters(Set<EtudiantsMaster> etudiantsMasters) {
        this.etudiantsMasters = etudiantsMasters;
        return this;
    }

    public Filiere addEtudiantsMaster(EtudiantsMaster etudiantsMaster) {
        this.etudiantsMasters.add(etudiantsMaster);
        etudiantsMaster.setFiliere(this);
        return this;
    }

    public Filiere removeEtudiantsMaster(EtudiantsMaster etudiantsMaster) {
        this.etudiantsMasters.remove(etudiantsMaster);
        etudiantsMaster.setFiliere(null);
        return this;
    }

    public void setEtudiantsMasters(Set<EtudiantsMaster> etudiantsMasters) {
        this.etudiantsMasters = etudiantsMasters;
    }

    public Set<Module> getModules() {
        return modules;
    }

    public Filiere modules(Set<Module> modules) {
        this.modules = modules;
        return this;
    }

    public Filiere addModule(Module module) {
        this.modules.add(module);
        module.setFiliere(this);
        return this;
    }

    public Filiere removeModule(Module module) {
        this.modules.remove(module);
        module.setFiliere(null);
        return this;
    }

    public void setModules(Set<Module> modules) {
        this.modules = modules;
    }

    public Etablissement getEtablissement() {
        return etablissement;
    }

    public Filiere etablissement(Etablissement etablissement) {
        this.etablissement = etablissement;
        return this;
    }

    public void setEtablissement(Etablissement etablissement) {
        this.etablissement = etablissement;
    }

    public Set<TableauDeBoard> getBoards() {
        return boards;
    }

    public Filiere boards(Set<TableauDeBoard> tableauDeBoards) {
        this.boards = tableauDeBoards;
        return this;
    }

    public Filiere addBoard(TableauDeBoard tableauDeBoard) {
        this.boards.add(tableauDeBoard);
        tableauDeBoard.getFiliers().add(this);
        return this;
    }

    public Filiere removeBoard(TableauDeBoard tableauDeBoard) {
        this.boards.remove(tableauDeBoard);
        tableauDeBoard.getFiliers().remove(this);
        return this;
    }

    public void setBoards(Set<TableauDeBoard> tableauDeBoards) {
        this.boards = tableauDeBoards;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Filiere)) {
            return false;
        }
        return id != null && id.equals(((Filiere) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Filiere{" +
            "id=" + getId() +
            ", nomfiliere='" + getNomfiliere() + "'" +
            ", responsable='" + getResponsable() + "'" +
            ", accreditaion='" + getAccreditaion() + "'" +
            ", programme='" + getProgramme() + "'" +
            "}";
    }
}
