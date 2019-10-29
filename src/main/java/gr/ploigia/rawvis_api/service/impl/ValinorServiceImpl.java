package gr.ploigia.rawvis_api.service.impl;

import com.google.common.collect.Range;
import gr.ploigia.rawvis.Point;
import gr.ploigia.rawvis.QuerySplitTileCreator;
import gr.ploigia.rawvis.Rectangle;
import gr.ploigia.rawvis.Valinor;
import gr.ploigia.rawvis.query.QueryResultsTraversalPolicy;
import gr.ploigia.rawvis_api.domain.ValinorOptions;
import gr.ploigia.rawvis_api.repository.ValinorOptionsRepository;
import gr.ploigia.rawvis_api.service.Query;
import gr.ploigia.rawvis_api.service.ValinorService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ValinorServiceImpl implements ValinorService {

    private final Logger log = LoggerFactory.getLogger(ValinorServiceImpl.class);
    private final ValinorOptionsRepository valinorOptionsRepository;
    Valinor valinor;
    ValinorOptions valinorOptions;

    public ValinorServiceImpl(ValinorOptionsRepository valinorOptionsRepository) {
        this.valinorOptionsRepository = valinorOptionsRepository;
    }

    public ValinorOptions init(ValinorOptions options) {
        Rectangle bounds = new Rectangle(Range.open(options.getxMin(), options.getxMax()),
            Range.open(options.getyMin(), options.getyMax()));
        valinor = new Valinor(options.getCsv(), bounds);
        valinor.setTileCreator(new QuerySplitTileCreator(options.getThreshold()));
        valinor.setxColumn(options.getxCol());
        valinor.setyColumn(options.getyCol());
        valinor.setDelimiter(options.getDelimiter().charAt(0));
        valinor.setGridSize(options.getGridSize());
        return options;
    }

    public Optional<List<Point>> getDatapoints(Long id, Query query) {
        return valinorOptionsRepository.findById(id).map(valinorOptions -> {
            if (this.valinorOptions == null || this.valinorOptions.getId() != id) {
                this.init(valinorOptions);
            }
            this.valinorOptions = valinorOptions;
            Rectangle rectangle = new Rectangle(Range.open(query.getX()[0], query.getX()[1]), Range.open(query.getY()[0], query.getY()[1]));
            List<Point> points = new ArrayList();
            valinor.executeWindowQuery(rectangle, (point, strings) -> {
                points.add(point);
            }, QueryResultsTraversalPolicy.DEFAULT);
            return points;
        });
    }
}
