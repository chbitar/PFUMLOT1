package com.planeta.pfum.service.dto;

import java.io.Serializable;
import java.util.Objects;
import io.github.jhipster.service.Criteria;
import com.planeta.pfum.domain.enumeration.Programme;
import io.github.jhipster.service.filter.BooleanFilter;
import io.github.jhipster.service.filter.DoubleFilter;
import io.github.jhipster.service.filter.Filter;
import io.github.jhipster.service.filter.FloatFilter;
import io.github.jhipster.service.filter.IntegerFilter;
import io.github.jhipster.service.filter.LongFilter;
import io.github.jhipster.service.filter.StringFilter;

/**
 * Criteria class for the {@link com.planeta.pfum.domain.Filiere} entity. This class is used
 * in {@link com.planeta.pfum.web.rest.FiliereResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /filieres?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
public class FiliereCriteria implements Serializable, Criteria {
    /**
     * Class for filtering Programme
     */
    public static class ProgrammeFilter extends Filter<Programme> {

        public ProgrammeFilter() {
        }

        public ProgrammeFilter(ProgrammeFilter filter) {
            super(filter);
        }

        @Override
        public ProgrammeFilter copy() {
            return new ProgrammeFilter(this);
        }

    }

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private StringFilter nomfiliere;

    private StringFilter responsable;

    private StringFilter accreditaion;

    private ProgrammeFilter programme;

    private LongFilter etudiantsExecutifId;

    private LongFilter etudiantsLicenceId;

    private LongFilter etudiantsMasterId;

    private LongFilter moduleId;

    private LongFilter etablissementId;

    private LongFilter anneeInscriptionId;

    private LongFilter boardId;

    public FiliereCriteria(){
    }

    public FiliereCriteria(FiliereCriteria other){
        this.id = other.id == null ? null : other.id.copy();
        this.nomfiliere = other.nomfiliere == null ? null : other.nomfiliere.copy();
        this.responsable = other.responsable == null ? null : other.responsable.copy();
        this.accreditaion = other.accreditaion == null ? null : other.accreditaion.copy();
        this.programme = other.programme == null ? null : other.programme.copy();
        this.etudiantsExecutifId = other.etudiantsExecutifId == null ? null : other.etudiantsExecutifId.copy();
        this.etudiantsLicenceId = other.etudiantsLicenceId == null ? null : other.etudiantsLicenceId.copy();
        this.etudiantsMasterId = other.etudiantsMasterId == null ? null : other.etudiantsMasterId.copy();
        this.moduleId = other.moduleId == null ? null : other.moduleId.copy();
        this.etablissementId = other.etablissementId == null ? null : other.etablissementId.copy();
        this.anneeInscriptionId = other.anneeInscriptionId == null ? null : other.anneeInscriptionId.copy();
        this.boardId = other.boardId == null ? null : other.boardId.copy();
    }

    @Override
    public FiliereCriteria copy() {
        return new FiliereCriteria(this);
    }

    public LongFilter getId() {
        return id;
    }

    public void setId(LongFilter id) {
        this.id = id;
    }

    public StringFilter getNomfiliere() {
        return nomfiliere;
    }

    public void setNomfiliere(StringFilter nomfiliere) {
        this.nomfiliere = nomfiliere;
    }

    public StringFilter getResponsable() {
        return responsable;
    }

    public void setResponsable(StringFilter responsable) {
        this.responsable = responsable;
    }

    public StringFilter getAccreditaion() {
        return accreditaion;
    }

    public void setAccreditaion(StringFilter accreditaion) {
        this.accreditaion = accreditaion;
    }

    public ProgrammeFilter getProgramme() {
        return programme;
    }

    public void setProgramme(ProgrammeFilter programme) {
        this.programme = programme;
    }

    public LongFilter getEtudiantsExecutifId() {
        return etudiantsExecutifId;
    }

    public void setEtudiantsExecutifId(LongFilter etudiantsExecutifId) {
        this.etudiantsExecutifId = etudiantsExecutifId;
    }

    public LongFilter getEtudiantsLicenceId() {
        return etudiantsLicenceId;
    }

    public void setEtudiantsLicenceId(LongFilter etudiantsLicenceId) {
        this.etudiantsLicenceId = etudiantsLicenceId;
    }

    public LongFilter getEtudiantsMasterId() {
        return etudiantsMasterId;
    }

    public void setEtudiantsMasterId(LongFilter etudiantsMasterId) {
        this.etudiantsMasterId = etudiantsMasterId;
    }

    public LongFilter getModuleId() {
        return moduleId;
    }

    public void setModuleId(LongFilter moduleId) {
        this.moduleId = moduleId;
    }

    public LongFilter getEtablissementId() {
        return etablissementId;
    }

    public void setEtablissementId(LongFilter etablissementId) {
        this.etablissementId = etablissementId;
    }

    public LongFilter getAnneeInscriptionId() {
        return anneeInscriptionId;
    }

    public void setAnneeInscriptionId(LongFilter anneeInscriptionId) {
        this.anneeInscriptionId = anneeInscriptionId;
    }

    public LongFilter getBoardId() {
        return boardId;
    }

    public void setBoardId(LongFilter boardId) {
        this.boardId = boardId;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        final FiliereCriteria that = (FiliereCriteria) o;
        return
            Objects.equals(id, that.id) &&
            Objects.equals(nomfiliere, that.nomfiliere) &&
            Objects.equals(responsable, that.responsable) &&
            Objects.equals(accreditaion, that.accreditaion) &&
            Objects.equals(programme, that.programme) &&
            Objects.equals(etudiantsExecutifId, that.etudiantsExecutifId) &&
            Objects.equals(etudiantsLicenceId, that.etudiantsLicenceId) &&
            Objects.equals(etudiantsMasterId, that.etudiantsMasterId) &&
            Objects.equals(moduleId, that.moduleId) &&
            Objects.equals(etablissementId, that.etablissementId) &&
            Objects.equals(anneeInscriptionId, that.anneeInscriptionId) &&
            Objects.equals(boardId, that.boardId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(
        id,
        nomfiliere,
        responsable,
        accreditaion,
        programme,
        etudiantsExecutifId,
        etudiantsLicenceId,
        etudiantsMasterId,
        moduleId,
        etablissementId,
        anneeInscriptionId,
        boardId
        );
    }

    @Override
    public String toString() {
        return "FiliereCriteria{" +
                (id != null ? "id=" + id + ", " : "") +
                (nomfiliere != null ? "nomfiliere=" + nomfiliere + ", " : "") +
                (responsable != null ? "responsable=" + responsable + ", " : "") +
                (accreditaion != null ? "accreditaion=" + accreditaion + ", " : "") +
                (programme != null ? "programme=" + programme + ", " : "") +
                (etudiantsExecutifId != null ? "etudiantsExecutifId=" + etudiantsExecutifId + ", " : "") +
                (etudiantsLicenceId != null ? "etudiantsLicenceId=" + etudiantsLicenceId + ", " : "") +
                (etudiantsMasterId != null ? "etudiantsMasterId=" + etudiantsMasterId + ", " : "") +
                (moduleId != null ? "moduleId=" + moduleId + ", " : "") +
                (etablissementId != null ? "etablissementId=" + etablissementId + ", " : "") +
                (anneeInscriptionId != null ? "anneeInscriptionId=" + anneeInscriptionId + ", " : "") +
                (boardId != null ? "boardId=" + boardId + ", " : "") +
            "}";
    }

}
