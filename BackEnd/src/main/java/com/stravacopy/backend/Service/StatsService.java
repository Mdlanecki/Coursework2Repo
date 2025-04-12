package com.stravacopy.backend.service;

import com.stravacopy.backend.model.Split;
import com.stravacopy.backend.model.RunningStats;
import com.stravacopy.backend.repository.SplitRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StatsService {

    private final SplitRepository splitRepository;

    public StatsService(SplitRepository splitRepository) {
        this.splitRepository = splitRepository;
    }

    public RunningStats generateStats() {
        List<Split> splits = splitRepository.findAll();

        long totalDistance = 0;
        int totalHeartRate = 0;
        int count = 0;

        for (Split split : splits) {
            totalDistance += split.getDistance();
            totalHeartRate += split.getHeartRate();
            count++;
        }

        double avgHeartRate = count > 0 ? (double) totalHeartRate / count : 0;

        return new RunningStats(totalDistance, avgHeartRate);
    }
}
