package gr.ploigia.rawvis_api.repository;
import gr.ploigia.rawvis_api.domain.ValinorOptions;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ValinorOptions entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ValinorOptionsRepository extends JpaRepository<ValinorOptions, Long> {

}
