package com.planeta.pfum.service.dto;

import java.io.Serializable;
import java.util.Objects;
import io.github.jhipster.service.Criteria;
import io.github.jhipster.service.filter.BooleanFilter;
import io.github.jhipster.service.filter.DoubleFilter;
import io.github.jhipster.service.filter.Filter;
import io.github.jhipster.service.filter.FloatFilter;
import io.github.jhipster.service.filter.IntegerFilter;
import io.github.jhipster.service.filter.LongFilter;
import io.github.jhipster.service.filter.StringFilter;

/**
 * Criteria class for the {@link com.planeta.pfum.domain.Professeur} entity. This class is used
 * in {@link com.planeta.pfum.web.rest.ProfesseurResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /professeurs?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
public class ProfesseurCriteria implements Serializable, Criteria {

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private StringFilter nom;

    private StringFilter prenom;

    private StringFilter etablissement;

    private StringFilter grade;

    private StringFilter diplome;

    private StringFilter cin;

    private StringFilter rib;

    private StringFilter email;

    private LongFilter userId;

    private LongFilter affectationModuleId;

    public ProfesseurCriteria(){
    }

    public ProfesseurCriteria(ProfesseurCriteria other){
        this.id = other.id == null ? null : other.id.copy();
        this.nom = other.nom == null ? null : other.nom.copy();
        this.prenom = other.prenom == null ? null : other.prenom.copy();
        this.etablissement = other.etablissement == null ? null : other.etablissement.copy();
        this.grade = other.grade == null ? null : other.grade.copy();
        this.diplome = other.diplome == null ? null : other.diplome.copy();
        this.cin = other.cin == null ? null : other.cin.copy();
        this.rib = other.rib == null ? null : other.rib.copy();
        this.email = other.email == null ? null : other.email.copy();
        this.userId = other.userId == null ? null : other.userId.copy();
        this.affectationModuleId = other.affectationModuleId == null ? null : other.affectationModuleId.copy();
    }

    @Override
    public ProfesseurCriteria copy() {
        return new ProfesseurCriteria(this);
    }

    public LongFilter getId() {
        return id;
    }

    public void setId(LongFilter id) {
        this.id = id;
    }

    public StringFilter getNom() {
        return nom;
    }

    public void setNom(StringFilter nom) {
        this.nom = nom;
    }

    public StringFilter getPrenom() {
        return prenom;
    }

    public void setPrenom(StringFilter prenom) {
        this.prenom = prenom;
    }

    public StringFilter getEtablissement() {
        return etablissement;
    }

    public void setEtablissement(StringFilter etablissement) {
        this.etablissement = etablissement;
    }

    public StringFilter getGrade() {
        return grade;
    }

    public void setGrade(StringFilter grade) {
        this.grade = grade;
    }

    public StringFilter getDiplome() {
        return diplome;
    }

    public void setDiplome(StringFilter diplome) {
        this.diplome = diplome;
    }

    public StringFilter getCin() {
        return cin;
    }

    public void setCin(StringFilter cin) {
        this.cin = cin;
    }

    public StringFilter getRib() {
        return rib;
    }

    public void setRib(StringFilter rib) {
        this.rib = rib;
    }

    public StringFilter getEmail() {
        return email;
    }

    public void setEmail(StringFilter email) {
        this.email = email;
    }

    public LongFilter getUserId() {
        return userId;
    }

    public void setUserId(LongFilter userId) {
        this.userId = userId;
    }

    public LongFilter getAffectationModuleId() {
        return affectationModuleId;
    }

    public void setAffectationModuleId(LongFilter affectationModuleId) {
        this.affectationModuleId = affectationModuleId;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        final ProfesseurCriteria that = (ProfesseurCriteria) o;
        return
            Objects.equals(id, that.id) &&
            Objects.equals(nom, that.nom) &&
            Objects.equals(prenom, that.prenom) &&
            Objects.equals(etablissement, that.etablissement) &&
            Objects.equals(grade, that.grade) &&
            Objects.equals(diplome, that.diplome) &&
            Objects.equals(cin, that.cin) &&
            Objects.equals(rib, that.rib) &&
            Objects.equals(email, that.email) &&
            Objects.equals(userId, that.userId) &&
            Objects.equals(affectationModuleId, that.affectationModuleId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(
        id,
        nom,
        prenom,
        etablissement,
        grade,
        diplome,
        cin,
        rib,
        email,
        userId,
        affectationModuleId
        );
    }

    @Override
    public String toString() {
        return "ProfesseurCriteria{" +
                (id != null ? "id=" + id + ", " : "") +
                (nom != null ? "nom=" + nom + ", " : "") +
                (prenom != null ? "prenom=" + prenom + ", " : "") +
                (etablissement != null ? "etablissement=" + etablissement + ", " : "") +
                (grade != null ? "grade=" + grade + ", " : "") +
                (diplome != null ? "diplome=" + diplome + ", " : "") +
                (cin != null ? "cin=" + cin + ", " : "") +
                (rib != null ? "rib=" + rib + ", " : "") +
                (email != null ? "email=" + email + ", " : "") +
                (userId != null ? "userId=" + userId + ", " : "") +
                (affectationModuleId != null ? "affectationModuleId=" + affectationModuleId + ", " : "") +
            "}";
    }

}
