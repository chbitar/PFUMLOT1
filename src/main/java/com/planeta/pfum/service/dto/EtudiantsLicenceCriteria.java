package com.planeta.pfum.service.dto;

import java.io.Serializable;
import java.util.Objects;

import com.planeta.pfum.domain.enumeration.DiplomeBac;
import com.planeta.pfum.domain.enumeration.Mention;

import io.github.jhipster.service.Criteria;
import io.github.jhipster.service.filter.BooleanFilter;
import io.github.jhipster.service.filter.Filter;
import io.github.jhipster.service.filter.InstantFilter;
import io.github.jhipster.service.filter.IntegerFilter;
import io.github.jhipster.service.filter.LongFilter;
import io.github.jhipster.service.filter.StringFilter;

/**
 * Criteria class for the {@link com.planeta.pfum.domain.EtudiantsLicence} entity. This class is used
 * in {@link com.planeta.pfum.web.rest.EtudiantsLicenceResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /etudiants-licences?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
public class EtudiantsLicenceCriteria implements Serializable, Criteria {
    /**
     * Class for filtering DiplomeBac
     */
    public static class DiplomeBacFilter extends Filter<DiplomeBac> {

        public DiplomeBacFilter() {
        }

        public DiplomeBacFilter(DiplomeBacFilter filter) {
            super(filter);
        }

        @Override
        public DiplomeBacFilter copy() {
            return new DiplomeBacFilter(this);
        }

    }
    /**
     * Class for filtering Mention
     */
    public static class MentionFilter extends Filter<Mention> {

        public MentionFilter() {
        }

        public MentionFilter(MentionFilter filter) {
            super(filter);
        }

        @Override
        public MentionFilter copy() {
            return new MentionFilter(this);
        }

    }

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private StringFilter suffixe;

    private StringFilter nom;

    private StringFilter prenom;

    private InstantFilter dateNaissance;

    private StringFilter adresseContact;

    private StringFilter ville;

    private StringFilter email;

    private DiplomeBacFilter pjBac;

    private MentionFilter mention;

    private StringFilter anneeObtention;

    private StringFilter cinPass;

    private StringFilter paysNationalite;

    private StringFilter paysResidence;

    private StringFilter codepostal;

    private StringFilter province;

    private IntegerFilter tel;

    private IntegerFilter deuxiemeTel;

    private BooleanFilter inscriptionvalide;

    private BooleanFilter absent;

    private LongFilter userId;

    private LongFilter absenceId;

    private LongFilter espaceEtudiantId;

    private LongFilter filiereId;

    private LongFilter anneeInscriptionId;

    private LongFilter modaliteId;

    public EtudiantsLicenceCriteria(){
    }

    public EtudiantsLicenceCriteria(EtudiantsLicenceCriteria other){
        this.id = other.id == null ? null : other.id.copy();
        this.suffixe = other.suffixe == null ? null : other.suffixe.copy();
        this.nom = other.nom == null ? null : other.nom.copy();
        this.prenom = other.prenom == null ? null : other.prenom.copy();
        this.dateNaissance = other.dateNaissance == null ? null : other.dateNaissance.copy();
        this.adresseContact = other.adresseContact == null ? null : other.adresseContact.copy();
        this.ville = other.ville == null ? null : other.ville.copy();
        this.email = other.email == null ? null : other.email.copy();
        this.pjBac = other.pjBac == null ? null : other.pjBac.copy();
        this.mention = other.mention == null ? null : other.mention.copy();
        this.anneeObtention = other.anneeObtention == null ? null : other.anneeObtention.copy();
        this.cinPass = other.cinPass == null ? null : other.cinPass.copy();
        this.paysNationalite = other.paysNationalite == null ? null : other.paysNationalite.copy();
        this.paysResidence = other.paysResidence == null ? null : other.paysResidence.copy();
        this.codepostal = other.codepostal == null ? null : other.codepostal.copy();
        this.province = other.province == null ? null : other.province.copy();
        this.tel = other.tel == null ? null : other.tel.copy();
        this.deuxiemeTel = other.deuxiemeTel == null ? null : other.deuxiemeTel.copy();
        this.inscriptionvalide = other.inscriptionvalide == null ? null : other.inscriptionvalide.copy();
        this.absent = other.absent == null ? null : other.absent.copy();
        this.userId = other.userId == null ? null : other.userId.copy();
        this.absenceId = other.absenceId == null ? null : other.absenceId.copy();
        this.espaceEtudiantId = other.espaceEtudiantId == null ? null : other.espaceEtudiantId.copy();
        this.filiereId = other.filiereId == null ? null : other.filiereId.copy();
        this.anneeInscriptionId = other.anneeInscriptionId == null ? null : other.anneeInscriptionId.copy();
        this.modaliteId = other.modaliteId == null ? null : other.modaliteId.copy();
    }

    @Override
    public EtudiantsLicenceCriteria copy() {
        return new EtudiantsLicenceCriteria(this);
    }

    public LongFilter getId() {
        return id;
    }

    public void setId(LongFilter id) {
        this.id = id;
    }

    public StringFilter getSuffixe() {
        return suffixe;
    }

    public void setSuffixe(StringFilter suffixe) {
        this.suffixe = suffixe;
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

    public InstantFilter getDateNaissance() {
        return dateNaissance;
    }

    public void setDateNaissance(InstantFilter dateNaissance) {
        this.dateNaissance = dateNaissance;
    }

    public StringFilter getAdresseContact() {
        return adresseContact;
    }

    public void setAdresseContact(StringFilter adresseContact) {
        this.adresseContact = adresseContact;
    }

    public StringFilter getVille() {
        return ville;
    }

    public void setVille(StringFilter ville) {
        this.ville = ville;
    }

    public StringFilter getEmail() {
        return email;
    }

    public void setEmail(StringFilter email) {
        this.email = email;
    }

    public DiplomeBacFilter getPjBac() {
        return pjBac;
    }

    public void setPjBac(DiplomeBacFilter pjBac) {
        this.pjBac = pjBac;
    }

    public MentionFilter getMention() {
        return mention;
    }

    public void setMention(MentionFilter mention) {
        this.mention = mention;
    }

    public StringFilter getAnneeObtention() {
        return anneeObtention;
    }

    public void setAnneeObtention(StringFilter anneeObtention) {
        this.anneeObtention = anneeObtention;
    }

    public StringFilter getCinPass() {
        return cinPass;
    }

    public void setCinPass(StringFilter cinPass) {
        this.cinPass = cinPass;
    }

    public StringFilter getPaysNationalite() {
        return paysNationalite;
    }

    public void setPaysNationalite(StringFilter paysNationalite) {
        this.paysNationalite = paysNationalite;
    }

    public StringFilter getPaysResidence() {
        return paysResidence;
    }

    public void setPaysResidence(StringFilter paysResidence) {
        this.paysResidence = paysResidence;
    }

    public StringFilter getCodepostal() {
        return codepostal;
    }

    public void setCodepostal(StringFilter codepostal) {
        this.codepostal = codepostal;
    }

    public StringFilter getProvince() {
        return province;
    }

    public void setProvince(StringFilter province) {
        this.province = province;
    }

    public IntegerFilter getTel() {
        return tel;
    }

    public void setTel(IntegerFilter tel) {
        this.tel = tel;
    }

    public IntegerFilter getDeuxiemeTel() {
        return deuxiemeTel;
    }

    public void setDeuxiemeTel(IntegerFilter deuxiemeTel) {
        this.deuxiemeTel = deuxiemeTel;
    }

    public BooleanFilter getInscriptionvalide() {
        return inscriptionvalide;
    }

    public void setInscriptionvalide(BooleanFilter inscriptionvalide) {
        this.inscriptionvalide = inscriptionvalide;
    }

    public BooleanFilter getAbsent() {
        return absent;
    }

    public void setAbsent(BooleanFilter absent) {
        this.absent = absent;
    }

    public LongFilter getUserId() {
        return userId;
    }

    public void setUserId(LongFilter userId) {
        this.userId = userId;
    }

    public LongFilter getAbsenceId() {
        return absenceId;
    }

    public void setAbsenceId(LongFilter absenceId) {
        this.absenceId = absenceId;
    }

    public LongFilter getEspaceEtudiantId() {
        return espaceEtudiantId;
    }

    public void setEspaceEtudiantId(LongFilter espaceEtudiantId) {
        this.espaceEtudiantId = espaceEtudiantId;
    }

    public LongFilter getFiliereId() {
        return filiereId;
    }

    public void setFiliereId(LongFilter filiereId) {
        this.filiereId = filiereId;
    }

    public LongFilter getAnneeInscriptionId() {
        return anneeInscriptionId;
    }

    public void setAnneeInscriptionId(LongFilter anneeInscriptionId) {
        this.anneeInscriptionId = anneeInscriptionId;
    }

    public LongFilter getModaliteId() {
        return modaliteId;
    }

    public void setModaliteId(LongFilter modaliteId) {
        this.modaliteId = modaliteId;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        final EtudiantsLicenceCriteria that = (EtudiantsLicenceCriteria) o;
        return
            Objects.equals(id, that.id) &&
            Objects.equals(suffixe, that.suffixe) &&
            Objects.equals(nom, that.nom) &&
            Objects.equals(prenom, that.prenom) &&
            Objects.equals(dateNaissance, that.dateNaissance) &&
            Objects.equals(adresseContact, that.adresseContact) &&
            Objects.equals(ville, that.ville) &&
            Objects.equals(email, that.email) &&
            Objects.equals(pjBac, that.pjBac) &&
            Objects.equals(mention, that.mention) &&
            Objects.equals(anneeObtention, that.anneeObtention) &&
            Objects.equals(cinPass, that.cinPass) &&
            Objects.equals(paysNationalite, that.paysNationalite) &&
            Objects.equals(paysResidence, that.paysResidence) &&
            Objects.equals(codepostal, that.codepostal) &&
            Objects.equals(province, that.province) &&
            Objects.equals(tel, that.tel) &&
            Objects.equals(deuxiemeTel, that.deuxiemeTel) &&
            Objects.equals(inscriptionvalide, that.inscriptionvalide) &&
            Objects.equals(absent, that.absent) &&
            Objects.equals(userId, that.userId) &&
            Objects.equals(absenceId, that.absenceId) &&
            Objects.equals(espaceEtudiantId, that.espaceEtudiantId) &&
            Objects.equals(filiereId, that.filiereId) &&
            Objects.equals(anneeInscriptionId, that.anneeInscriptionId) &&
            Objects.equals(modaliteId, that.modaliteId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(
        id,
        suffixe,
        nom,
        prenom,
        dateNaissance,
        adresseContact,
        ville,
        email,
        pjBac,
        mention,
        anneeObtention,
        cinPass,
        paysNationalite,
        paysResidence,
        codepostal,
        province,
        tel,
        deuxiemeTel,
        inscriptionvalide,
        absent,
        userId,
        absenceId,
        espaceEtudiantId,
        filiereId,
        anneeInscriptionId,
        modaliteId
        );
    }

    @Override
    public String toString() {
        return "EtudiantsLicenceCriteria{" +
                (id != null ? "id=" + id + ", " : "") +
                (suffixe != null ? "suffixe=" + suffixe + ", " : "") +
                (nom != null ? "nom=" + nom + ", " : "") +
                (prenom != null ? "prenom=" + prenom + ", " : "") +
                (dateNaissance != null ? "dateNaissance=" + dateNaissance + ", " : "") +
                (adresseContact != null ? "adresseContact=" + adresseContact + ", " : "") +
                (ville != null ? "ville=" + ville + ", " : "") +
                (email != null ? "email=" + email + ", " : "") +
                (pjBac != null ? "pjBac=" + pjBac + ", " : "") +
                (mention != null ? "mention=" + mention + ", " : "") +
                (anneeObtention != null ? "anneeObtention=" + anneeObtention + ", " : "") +
                (cinPass != null ? "cinPass=" + cinPass + ", " : "") +
                (paysNationalite != null ? "paysNationalite=" + paysNationalite + ", " : "") +
                (paysResidence != null ? "paysResidence=" + paysResidence + ", " : "") +
                (codepostal != null ? "codepostal=" + codepostal + ", " : "") +
                (province != null ? "province=" + province + ", " : "") +
                (tel != null ? "tel=" + tel + ", " : "") +
                (deuxiemeTel != null ? "deuxiemeTel=" + deuxiemeTel + ", " : "") +
                (inscriptionvalide != null ? "inscriptionvalide=" + inscriptionvalide + ", " : "") +
                (absent != null ? "absent=" + absent + ", " : "") +
                (userId != null ? "userId=" + userId + ", " : "") +
                (absenceId != null ? "absenceId=" + absenceId + ", " : "") +
                (espaceEtudiantId != null ? "espaceEtudiantId=" + espaceEtudiantId + ", " : "") +
                (filiereId != null ? "filiereId=" + filiereId + ", " : "") +
                (anneeInscriptionId != null ? "anneeInscriptionId=" + anneeInscriptionId + ", " : "") +
                (modaliteId != null ? "modaliteId=" + modaliteId + ", " : "") +
            "}";
    }

}
